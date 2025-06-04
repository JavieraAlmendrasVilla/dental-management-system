import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { DoctorSelector } from './DoctorSelector';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { useTheme } from '../../lib/theme/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { t } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <button 
          onClick={onMenuClick}
          className="mr-2 rounded-md p-2 text-muted-foreground hover:bg-muted md:hidden"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t('common.search')}
            className="w-64 rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
            <Bell className="h-5 w-5" />
          </button>
          
          <button 
            className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <LanguageSelector />
          
          <DoctorSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;