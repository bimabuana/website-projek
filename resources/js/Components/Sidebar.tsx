// src/Components/Sidebar.tsx
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sliders, Settings } from 'lucide-react';

const Sidebar = () => {
  const { url } = usePage();
  const currentPath = url;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: '/controlpanel',
      label: 'ControlPanel',
      icon: <Sliders size={18} />,
    },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 bg-transparent text-white px-4 py-6 flex-col justify-between">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all
              ${
                isActive(item.href)
                  ? 'bg-blue-900 text-white font-semibold shadow'
                  : 'text-blue-600 hover:bg-blue-800/30 hover:text-white font-semibold'
              }
            `}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all
            ${
              isActive('/settings')
                ? 'bg-blue-900 text-white font-semibold shadow'
                : 'text-blue-600 hover:bg-blue-800/30 hover:text-white font-semibold'
            }
          `}
        >
          <Settings size={18} />
          <span className="text-sm">Setting</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
