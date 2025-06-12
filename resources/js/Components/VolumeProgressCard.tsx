import React, { useState } from 'react';
import axios from 'axios';

const VolumeProgressCard: React.FC<{ volume?: number }> = ({ volume = 6000 }) => {
  const [tempVolume, setTempVolume] = useState(volume);
  const [savedVolume, setSavedVolume] = useState(volume);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/set-volume', { volume: tempVolume });

      setSavedVolume(tempVolume);
      console.log('✅ Volume berhasil disimpan:', tempVolume);
    } catch (error: any) {
      console.error('❌ Gagal menyimpan volume:', error?.response?.data || error.message);
      alert('Terjadi kesalahan saat menyimpan volume maksimal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-teal-100 ring-1 ring-teal-50 p-5 w-full min-h-[180px] flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Volume Air Maksimal</h3>

      {/* Slider */}
      <div className="mt-4">
        <input
          type="range"
          min={1000}
          max={10000}
          step={1000}
          value={tempVolume}
          onChange={(e) => setTempVolume(Number(e.target.value))}
          className="w-full accent-teal-500"
        />
        <div className="mt-2 text-sm text-gray-700 text-center">
          {tempVolume.toLocaleString()} mL
        </div>
      </div>

      {/* Tombol Simpan */}
      <button
        onClick={handleSave}
        disabled={tempVolume === savedVolume || isLoading}
        className={`mt-4 py-2 px-4 rounded-lg text-sm font-semibold transition-all border flex justify-center items-center ${
          tempVolume === savedVolume || isLoading
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-teal-600 text-white hover:bg-teal-700 border-teal-600'
        }`}
      >
        {isLoading ? 'Menyimpan...' : 'Simpan'}
      </button>
    </div>
  );
};

export default VolumeProgressCard;
