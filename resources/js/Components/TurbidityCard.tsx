import React, { useEffect, useState } from "react";
import SensorCard from "@/Components/SensorCards";
import { supabase } from "@/supabase";
import { Droplets } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const TurbidityCard: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);

  // Ambil data awal & subscribe ke perubahan realtime
  useEffect(() => {
    const fetchInitialData = async () => {
      const { data } = await supabase
        .from("sensor_data")
        .select("turbidity_level")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setValue(data?.turbidity_level ?? null);
    };

    fetchInitialData();

    // Realtime listener untuk INSERT pada tabel sensor_data
    const channel = supabase
      .channel("turbidity-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_data",
        },
        (payload) => {
          const newValue = payload.new.turbidity_level;
          setValue(newValue);
        }
      )
      .subscribe();

    // Bersihkan channel saat komponen dibuang
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fungsi status berdasarkan nilai
  const getStatus = (val: number): "aman" | "sedang" | "awas" =>
    val < 5 ? "aman" : val < 20 ? "sedang" : "awas";

  const getColorByStatus = (status: "aman" | "sedang" | "awas") => {
    switch (status) {
      case "aman":
        return "#22c55e"; // green
      case "sedang":
        return "#facc15"; // yellow
      case "awas":
        return "#ef4444"; // red
      default:
        return "#e5e7eb"; // gray
    }
  };

  const status = value != null ? getStatus(value) : "sedang";
  const gaugeValue = Math.min(value ?? 0, 25);
  const data = [
    { value: gaugeValue },
    { value: 25 - gaugeValue },
  ];
  const COLORS = [getColorByStatus(status), "#e5e7eb"];

  return (
    <SensorCard
      icon={Droplets}
      label="Turbidity"
      status={status}
      iconColor="text-blue-500"
      value={
        <div className="flex flex-col items-center justify-center w-full">
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
          <div className="text-center mt-[-10px]">
            <p className="text-4xl font-bold leading-none">
              {value != null ? Math.round(value) : "N/A"}
            </p>
            <span className="text-sm text-gray-500">NTU</span>
          </div>
        </div>
      }
    />
  );
};

export default TurbidityCard;
