import { Bell, Moon, Search, Sun, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would toggle dark mode classes on the html element
  };

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
            placeholder="Search..."
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
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          
          <div className="relative">
            <button className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden text-sm font-medium md:block">Dr. Morgan</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;