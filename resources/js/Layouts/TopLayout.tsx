import React from 'react';
import ToggleAutoModeCard from '@/Components/ToggleAutoModeCard';
import VolumeProgressCard from '@/Components/VolumeProgressCard';

type Props = {
  isActive: boolean;
  onToggle: () => Promise<void>;
  volume: number;
};

const TopLayout: React.FC<Props> = ({ isActive, onToggle, volume }) => {
  return (
    <section className="mt-6">
      <h3 className="text-md font-semibold mb-2">Auto Mode</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:max-w-sm">
          <ToggleAutoModeCard isActive={isActive} onToggle={onToggle} />
        </div>
        <div className="w-full">
          <VolumeProgressCard volume={volume} />
        </div>
      </div>
    </section>
  );
};

export default TopLayout;
