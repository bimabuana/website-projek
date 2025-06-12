import TurbidityCard from '@/Components/TurbidityCard';
import TDSCard from '@/Components/TDSCard';
import VolumeAirCard from '@/Components/VolumeAirCard';
import ESPStatusCard from '@/Components/ESPStatusCard';
import SensorChart from '@/Components/SensorChart';
import SensorDataTable from '@/Components/SensorDataTable';

export default function SensorDataLayout() {
  return (
    <div className="space-y-6">
      {/* Section Cards + Grafik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-full overflow-hidden">

        {/* Cards Ringkasan */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-full">
          <TurbidityCard />
          <TDSCard />
          <VolumeAirCard />
          <ESPStatusCard />
        </div>

        {/* Grafik Sensor */}
        <div className="lg:col-span-2">
          <SensorChart />
        </div>
      </div>

      {/* Tabel Historis */}
      <SensorDataTable />
    </div>
  );
}
