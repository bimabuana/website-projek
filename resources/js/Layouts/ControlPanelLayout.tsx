import React from 'react';
import ModeToggleWrapper from '@/Components/ModeToggleWrapper';

const ControlPanelLayout: React.FC = () => {
  return (
    // Hapus bg dan padding agar konsisten dengan layout utama
    <div className="space-y-0">
      <ModeToggleWrapper />
    </div>
  );
};

export default ControlPanelLayout;
