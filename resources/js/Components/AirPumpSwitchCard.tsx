import React, { useState } from 'react';
import axios from 'axios';
import { Fan, Loader2 } from 'lucide-react';

interface Props {
  isEnabled: boolean;
}

const AirPumpSwitchCard: React.FC<Props> = ({ isEnabled }) => {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePump = async () => {
    if (!isEnabled) return;
    setIsLoading(true);

    try {
      const response = await axios.post('/api/control-pump', {
        air_pump: !isOn, // toggle status pompa udara
      });

      console.log('✅ Pompa udara berhasil dikontrol:', response.data);
      setIsOn((prev) => !prev);
    } catch (error: any) {
      console.error('❌ Gagal mengontrol pompa udara:', error?.response?.data || error.message);
      alert('Terjadi kesalahan saat mengontrol pompa udara.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
            <Fan className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">Pompa Udara</h2>
            <p className="text-sm text-gray-400">Kontrol manual</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${
            isOn
              ? 'bg-blue-100 text-blue-600 border-blue-200'
              : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          {isOn ? 'Aktif' : 'Nonaktif'}
        </span>
      </div>

      <div className="border-t border-gray-100 my-4"></div>

      <div className="flex flex-col gap-4 mt-auto">
        <span className="text-sm text-gray-500">Status kontrol</span>
        <button
          onClick={togglePump}
          disabled={!isEnabled || isLoading}
          className={`w-full py-3 text-base font-medium rounded-lg transition-all duration-200 border flex justify-center items-center ${
            isOn
              ? 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
          } ${!isEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
          {isLoading ? 'Memproses...' : isOn ? 'Matikan' : 'Nyalakan'}
        </button>
      </div>
    </div>
  );
};

export default AirPumpSwitchCard;
