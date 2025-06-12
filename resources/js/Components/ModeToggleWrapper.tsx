import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopLayout from '@/Layouts/TopLayout';
import MiddleLayout from '@/Layouts/MiddleLayout';
import BottomLayout from '@/Layouts/BottomLayout';
import toast from 'react-hot-toast';

const ModeToggleWrapper: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<'auto' | 'manual' | null>(null);
  const [volume, setVolume] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('/api/current-mode');
        const { mode, volume } = response.data;
        setCurrentMode(mode);
        setVolume(volume ?? 0);
      } catch (error) {
        console.error('Gagal mengambil status awal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleModeChange = async (mode: 'auto' | 'manual') => {
    try {
      const res = await axios.post('/api/update-mode', { mode });

      if (res.status === 200) {
        setCurrentMode(mode);
        toast.success(`Mode ${mode} berhasil diaktifkan`);
      }
    } catch (err) {
      console.error('Gagal mengubah mode:', err);
      toast.error('Gagal mengubah mode. Silakan coba lagi.');
    }
  };

  if (loading) return <p>Memuat status...</p>;
  if (!currentMode || !['auto', 'manual'].includes(currentMode)) return <p>Status tidak valid</p>;

  return (
    <div className="space-y-10 px-1 sm:px-5 lg:px-6 py-0">
      <TopLayout
        isActive={currentMode === 'auto'}
        onToggle={() => handleModeChange('auto')}
        volume={volume}
      />
      <MiddleLayout
        isActive={currentMode === 'manual'}
        onToggle={() => handleModeChange('manual')}
      />
      <BottomLayout />
    </div>
  );
};

export default ModeToggleWrapper;
