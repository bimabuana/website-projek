import React, { useEffect, useState } from "react";
import SensorCard from "@/Components/SensorCards";
import { supabase } from '@/supabase';
import { Cpu, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ESPStatusCard: React.FC = () => {
  const [value, setValue] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("sensor_data")
        .select("esp_status")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setValue(data?.esp_status ?? null);
    };
    fetchData();
  }, []);

  const statusIcon = () => {
    if (value === null) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">N/A</span>
        </div>
      );
    }

    const isConnected = value === true;
    const iconColor = isConnected ? "text-green-500" : "text-red-500";
    const label = isConnected ? "Connected" : "Disconnected";

    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isConnected ? "online" : "offline"}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <Wifi size={40} className={iconColor} />
          <span className="text-sm text-gray-500 mt-1">{label}</span>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <SensorCard
      icon={Cpu}
      label="ESP Status"
      value={statusIcon()}
      status={value === true ? "aman" : "awas"}
      iconColor="text-gray-600"
    />
  );
};

export default ESPStatusCard;
