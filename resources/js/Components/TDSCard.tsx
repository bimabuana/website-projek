import React, { useEffect, useState } from "react";
import SensorCard from "@/Components/SensorCards";
import { supabase } from "@/supabase";
import { FlaskConical } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const TDSCard: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    // Ambil data awal
    const fetchInitialData = async () => {
      const { data } = await supabase
        .from("sensor_data")
        .select("tds_level")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setValue(data?.tds_level ?? null);
    };

    fetchInitialData();

    // Realtime listener
    const channel = supabase
      .channel("tds-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_data",
        },
        (payload) => {
          const newValue = payload.new.tds_level;
          setValue(newValue);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Mapping nilai ke status
  const getStatus = (val: number): "aman" | "sedang" | "awas" =>
    val < 180 ? "aman" : val < 181 ? "sedang" : "awas";

  // Warna berdasarkan status
  const getColorByStatus = (status: "aman" | "sedang" | "awas") => {
    switch (status) {
      case "aman":
        return "#22c55e"; // green
      case "sedang":
        return "#facc15"; // yellow
      case "awas":
        return "#ef4444"; // red
      default:
        return "#e5e7eb"; // fallback gray
    }
  };

  const status = value != null ? getStatus(value) : "sedang";
  const gaugeValue = Math.min(value ?? 0, 1000) / 10; // normalize ke 0–100 range
  const data = [
    { value: gaugeValue },
    { value: 100 - gaugeValue },
  ];
  const COLORS = [getColorByStatus(status), "#e5e7eb"];

  return (
    <SensorCard
      icon={FlaskConical}
      label="TDS"
      status={status}
      iconColor="text-purple-500"
      value={
        <div className="flex flex-col items-center justify-center w-full">
          {/* Half Pie Chart */}
          <PieChart width={140} height={80}>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="100%"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>

          {/* Value Display */}
          <div className="text-center mt-[-10px]">
            <p className="text-4xl font-bold leading-none">
              {value != null ? Math.round(value) : "N/A"}
            </p>
            <span className="text-sm text-gray-500">ppm</span>
          </div>
        </div>
      }
    />
  );
};

export default TDSCard;
