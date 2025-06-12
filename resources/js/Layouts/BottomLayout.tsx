import React from 'react';
import DeviceLogTable from '@/Components/DeviceLogTable'; // pastikan path-nya sesuai

const BottomLayout: React.FC = () => {
  return (
    <section className="bg-white rounded-xl py-6 shadow-md">
      <DeviceLogTable />
    </section>
  );
};

export default BottomLayout;
