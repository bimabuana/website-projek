import React from "react";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  unit?: string;
  status: "aman" | "sedang" | "awas";
  iconColor?: string;
}

const SensorCard: React.FC<SensorCardProps> = ({
  icon: Icon,
  label,
  value,
  unit,
  status,
  iconColor = "text-gray-500",
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 min-h-[120px]">
      {/* Status indicator */}
      <div
        className="absolute top-3 right-3 w-4 h-4 rounded-full"
        style={{
          backgroundColor:
            status === "aman"
              ? "#22c55e"
              : status === "sedang"
              ? "#facc15"
              : "#ef4444",
        }}
      />

      {/* Label */}
      <div className="flex items-center gap-2">
        <Icon className={iconColor} size={20} />
        <h2 className="text-sm text-gray-500">{label}</h2>
      </div>

      {/* Value Display */}
      <div className="flex items-center justify-center min-h-[100px]">
        {typeof value === "string" || typeof value === "number" ? (
          <div className="flex items-end">
            <p className="text-5xl font-bold leading-none">{value}</p>
            {unit && (
              <span className="text-lg text-gray-500 ml-1 mb-1">{unit}</span>
            )}
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default SensorCard;
