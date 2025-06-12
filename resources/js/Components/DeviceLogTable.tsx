// src/pages/DeviceLogTable.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import dayjs from 'dayjs';

export default function DeviceLogTable() {
  const [deviceLogs, setDeviceLogs] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchLogs();
  }, [filterDate, page]);

  const fetchLogs = async () => {
    let query = supabase
      .from('device_controls')
      .select('*')
      .order('updated_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (filterDate) {
      const start = dayjs(filterDate).startOf('day').toISOString();
      const end = dayjs(filterDate).endOf('day').toISOString();
      query = query.gte('updated_at', start).lte('updated_at', end);
    }

    const { data, error } = await query;
    if (!error && data) {
      setDeviceLogs(data);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Log Kontrol Perangkat</h2>
        <div className="flex gap-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Waktu</th>
              <th className="px-4 py-2 border">Pompa Air</th>
              <th className="px-4 py-2 border">Pompa Udara</th>
              <th className="px-4 py-2 border">Volume (mL)</th>
              <th className="px-4 py-2 border">Manual Override</th>
              <th className="px-4 py-2 border">Mode</th>
              <th className="px-4 py-2 border">Sumber</th>
            </tr>
          </thead>
          <tbody>
            {deviceLogs.map((log, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">
                  {new Date(log.updated_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">{log.water_pump ? 'ON' : 'OFF'}</td>
                <td className="px-4 py-2 border">{log.air_pump ? 'ON' : 'OFF'}</td>
                <td className="px-4 py-2 border">{log.volume} mL</td>
                <td className="px-4 py-2 border">{log.manual_override ? 'Ya' : 'Tidak'}</td>
                <td className="px-4 py-2 border">{log.mode}</td>
                <td className="px-4 py-2 border">{log.source}</td>
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
