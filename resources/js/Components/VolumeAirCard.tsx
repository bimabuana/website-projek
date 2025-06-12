import React, { useEffect, useState } from "react";
import SensorCard from "@/Components/SensorCards";
import { supabase } from "@/supabase";
import { Droplet } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

const VolumeAirCard: React.FC = () => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    // Ambil data awal
    const fetchData = async () => {
      const { data } = await supabase
        .from("sensor_data")
        .select("volume_liter")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setValue(data?.volume_liter ?? null);
    };
    fetchData();

    // Realtime update ketika ada INSERT baru
    const channel = supabase
      .channel("volume-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_data",
        },
        (payload) => {
          const newValue = payload.new.volume_liter;
          setValue(newValue);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Status logika
  const getStatus = (val: number): "aman" | "sedang" | "awas" =>
    val < 10 ? "aman" : val > 20 ? "awas" : "sedang";

  // Warna untuk status
  const getColorByStatus = (status: "aman" | "sedang" | "awas") => {
    switch (status) {
      case "aman":
        return "#22c55e"; // green
      case "sedang":
        return "#facc15"; // yellow
      case "awas":
        return "#ef4444"; // red
      default:
        return "#e5e7eb";
    }
  };

  const status = value != null ? getStatus(value) : "sedang";
  const gaugeValue = Math.min(value ?? 0, 30); // Maksimal 30L
  const data = [
    { value: gaugeValue },
    { value: 30 - gaugeValue },
  ];
  const COLORS = [getColorByStatus(status), "#e5e7eb"];

  return (
    <SensorCard
      icon={Droplet}
      label="Volume Air"
      status={status}
      iconColor="text-sky-500"
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

          {/* Nilai & Satuan */}
          <div className="text-center mt-[-10px]">
            <p className="text-4xl font-bold leading-none">
              {value != null ? Math.round(value) : "N/A"}
            </p>
            <span className="text-sm text-gray-500">L</span>
          </div>
        </div>
      }
    />
  );
};

export default VolumeAirCard;
