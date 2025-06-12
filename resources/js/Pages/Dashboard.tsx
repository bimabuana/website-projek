import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SensorDataLayout from '@/Layouts/SensorDataLayout';

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <main className="overflow-x-hidden px-4 py-6">
        <SensorDataLayout />
      </main>
    </AuthenticatedLayout>
  );
}
