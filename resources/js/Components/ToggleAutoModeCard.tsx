import React, { useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';

type Props = {
  isActive: boolean;
  onToggle: () => Promise<void>;
};

const ToggleAutoModeCard: React.FC<Props> = ({ isActive, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-teal-100 ring-1 ring-teal-50 p-5 w-full max-w-md hover:shadow-2xl transition flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-teal-50 text-teal-600 p-2.5 rounded-full">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Mode Auto</h3>
            <p className="text-sm text-gray-500">Kontrol otomatis sistem</p>
          </div>
        </div>
        <div className="flex items-center bg-green-100 text-green-600 px-2 py-0.5 rounded-md font-medium text-xs">
          <CheckCircle size={14} className="mr-1" />
          MQTT Terhubung
        </div>
      </div>

      <div className="border-t border-gray-100 my-3" />

      {/* Kontrol */}
      <div className="flex flex-col gap-3 mt-auto">
        <span className="text-sm text-gray-500">
          Status kontrol:{' '}
          <span className="font-semibold">{isActive ? 'Auto' : 'Manual'}</span>
        </span>
        <button
          onClick={handleClick}
          disabled={loading}
          className={`w-full py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 border flex justify-center items-center ${
            isActive
              ? 'bg-white text-teal-600 border-teal-600 hover:bg-teal-50'
              : 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
          }`}
        >
          {loading
            ? 'Memproses...'
            : isActive
            ? 'Nonaktifkan Mode Auto'
            : 'Aktifkan Mode Auto'}
        </button>
      </div>
    </div>
  );
};

export default ToggleAutoModeCard;
