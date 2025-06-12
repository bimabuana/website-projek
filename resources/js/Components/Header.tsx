import React, { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import type { PageProps } from '@/types';

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { props } = usePage<PageProps>();
  const user = props.auth.user;

  const [dateTime, setDateTime] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <header className="bg-white shadow-md w-full h-16 flex items-center px-4 sm:px-6 justify-between border-b border-gray-200">
      {/* Kiri */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Tombol hamburger untuk mobile jika butuh */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Judul */}
        <h1 className="text-lg sm:text-xl font-semibold text-blue-600">Filter</h1>

        {/* Waktu */}
        <span className="hidden sm:block text-gray-500 text-sm">{dateTime}</span>
      </div>

      {/* Kanan */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:inline text-sm text-gray-700 font-medium">Hi, {user?.name}</span>
        <button
          className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
