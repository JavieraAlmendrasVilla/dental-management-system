import { Link, useLocation } from 'react-router-dom';
import { Calendar, CreditCard, FileText, Globe, Home, PieChart, Settings, Bluetooth as Tooth, Users, UserCog } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n/LanguageContext';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavLink = ({ to, icon, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
      active
        ? 'bg-primary text-white'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();

  const navItems = [
    { to: '/', icon: <Home className="h-5 w-5" />, label: t('navigation.dashboard') },
    { to: '/patients', icon: <Users className="h-5 w-5" />, label: t('navigation.patients') },
    { to: '/appointments', icon: <Calendar className="h-5 w-5" />, label: t('navigation.appointments') },
    { to: '/treatments', icon: <Tooth className="h-5 w-5" />, label: t('navigation.treatments') },
    { to: '/billing', icon: <CreditCard className="h-5 w-5" />, label: t('navigation.billing') },
    { to: '/reports', icon: <PieChart className="h-5 w-5" />, label: t('navigation.reports') },
    { to: '/website-builder', icon: <Globe className="h-5 w-5" />, label: t('navigation.websiteBuilder') },
    { to: '/doctors', icon: <UserCog className="h-5 w-5" />, label: 'Doctors' },
    { to: '/settings', icon: <Settings className="h-5 w-5" />, label: t('navigation.settings') },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:z-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <Tooth className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">InnoDent</span>
          </Link>
          
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted md:hidden"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="space-y-1.5 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={currentPath === item.to || (item.to !== '/' && currentPath.startsWith(item.to))}
            />
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center gap-3">
              <Tooth className="h-10 w-10 text-primary" />
              <div>
                <p className="text-xs font-medium">InnoDent</p>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

export default Sidebar