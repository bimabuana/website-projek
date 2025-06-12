import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ControlPanelLayout from '@/Layouts/ControlPanelLayout';
import { Head } from '@inertiajs/react';

export default function ControlPanel() {
  return (
    <>
      <Head title="Control Panel" />

      <AuthenticatedLayout
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Control Panel
          </h2>
        }
      >
        <ControlPanelLayout />
      </AuthenticatedLayout>
    </>
  );
}
