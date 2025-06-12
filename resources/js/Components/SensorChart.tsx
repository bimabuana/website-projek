import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { supabase } from '@/supabase';

type SensorData = {
  created_at: string;
  turbidity_level: number;
  tds_level: number;
  volume_liter: number;
};

type TimeRange = 'today' | 'week' | 'month';

export default function SensorChart() {
  const [data, setData] = useState<SensorData[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('today');

  const fetchData = async () => {
    const now = new Date();
    let fromDate: string;

    if (timeRange === 'today') {
      fromDate = now.toISOString().split('T')[0]; // hari ini
    } else if (timeRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      fromDate = weekAgo.toISOString();
    } else {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      fromDate = monthAgo.toISOString();
    }

    const { data, error } = await supabase
      .from('sensor_data')
      .select('created_at, turbidity_level, tds_level, volume_liter')
      .gte('created_at', fromDate)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setData(data);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // live update tiap 5 detik
    return () => clearInterval(interval);
  }, [timeRange]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Grafik Sensor</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="border rounded-lg px-3 py-1 text-sm"
        >
          <option value="today">Hari ini</option>
          <option value="week">Mingguan</option>
          <option value="month">Bulanan</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
          <YAxis />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="turbidity_level" stroke="#3b82f6" name="Turbidity (NTU)" dot={false} />
          <Line type="monotone" dataKey="tds_level" stroke="#f59e0b" name="TDS (ppm)" dot={false} />
          <Line type="monotone" dataKey="volume_liter" stroke="#10b981" name="Volume (L)" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
