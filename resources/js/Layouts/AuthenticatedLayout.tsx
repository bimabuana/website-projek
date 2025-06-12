// src/Layouts/Authenticated.tsx
import Header from '@/Components/Header';
import Sidebar from '@/Components/Sidebar';
import BottomNav from '@/Components/BottomNav';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <Header />

      <div className="flex flex-1 w-full min-w-0">
        {/* Sidebar hanya tampil di desktop */}
        <Sidebar />

        {/* Gunakan w-full + min-w-0 untuk responsivitas */}
        <main className="w-full min-w-0 p-4 pb-20 lg:pb-4">
          {header && <div className="mb-4">{header}</div>}
          {children}
        </main>
      </div>

      {/* Bottom Navigation hanya tampil di mobile */}
      <BottomNav />
    </div>
  );
}
