import React from 'react';
import ToggleManualModeCard from '@/Components/ToggleManualModeCard';
import WaterPumpSwitchCard from '@/Components/WaterPumpSwitchCard';
import AirPumpSwitchCard from '@/Components/AirPumpSwitchCard';

type Props = {
  isActive: boolean;
  onToggle: () => Promise<void>;
};

const MiddleLayout: React.FC<Props> = ({ isActive, onToggle }) => {
  return (
    <section className="mt-6">
      <h3 className="text-md font-semibold mb-2">Manual Mode</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:max-w-sm">
          <ToggleManualModeCard isActive={isActive} onToggle={onToggle} />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <WaterPumpSwitchCard isEnabled={isActive} />
          </div>
          <div className="flex-1">
            <AirPumpSwitchCard isEnabled={isActive} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleLayout;
