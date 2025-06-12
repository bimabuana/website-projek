// src/pages/SensorTable.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import { exportSensorDataToExcel } from '@/Utils/exportSensorDataToExcel';
import dayjs from 'dayjs';

export default function SensorTable() {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [filterDate, page]);

  const fetchData = async () => {
    let query = supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (filterDate) {
      const start = dayjs(filterDate).startOf('day').toISOString();
      const end = dayjs(filterDate).endOf('day').toISOString();
      query = query.gte('created_at', start).lte('created_at', end);
    }

    const { data, error } = await query;
    if (!error && data) {
      setSensorData(data);
    }
  };

  const handleExport = () => {
    exportSensorDataToExcel(sensorData);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tabel Data Historis Sensor</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export ke Excel
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Waktu</th>
              <th className="px-4 py-2 border">Turbidity (NTU)</th>
              <th className="px-4 py-2 border">TDS (ppm)</th>
              <th className="px-4 py-2 border">Volume (L)</th>
              <th className="px-4 py-2 border">Pompa Air</th>
              <th className="px-4 py-2 border">Pompa Udara</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{new Date(row.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 border">{row.turbidity_level ?? '-'}</td>
                <td className="px-4 py-2 border">{row.tds_level ?? '-'}</td>
                <td className="px-4 py-2 border">{row.volume_liter ?? '-'}</td>
                <td className="px-4 py-2 border">{row.water_pump_status ? 'ON' : 'OFF'}</td>
                <td className="px-4 py-2 border">{row.air_pump_status ? 'ON' : 'OFF'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Sebelumnya
        </button>
        <span className="text-gray-700">Halaman {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}
