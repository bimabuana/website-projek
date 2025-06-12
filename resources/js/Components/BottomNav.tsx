import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Sliders, Settings } from 'lucide-react';

const BottomNav = () => {
  const { url } = usePage();
  const currentPath = url;

  const isActive = (path: string) => currentPath === path;

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/controlpanel',
      label: 'Control',
      icon: Sliders,
    },
    {
      href: '/settings',
      label: 'Setting',
      icon: Settings,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-md z-50 flex justify-around py-2">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center justify-center text-xs transition-all ${
            isActive(href)
              ? 'text-blue-600 font-semibold'
              : 'text-gray-500 hover:text-blue-500'
          }`}
        >
          <Icon size={20} />
          <span className="text-[11px] mt-0.5">{label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
