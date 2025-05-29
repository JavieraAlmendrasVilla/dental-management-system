import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: Theme;
  updateTheme: (newTheme: Partial<Theme>) => void;
}

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font: {
    family: string;
    heading: string;
  };
  radius: string;
}

const defaultTheme: Theme = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#3f9b9b',
    accent: '#f97316',
  },
  font: {
    family: 'Inter',
    heading: 'Inter',
  },
  radius: '0.5rem',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('dentasync-theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('dentasync-theme', JSON.stringify(theme));
    
    // Update CSS variables
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--primary', hexToHSL(theme.colors.primary));
    root.style.setProperty('--secondary', hexToHSL(theme.colors.secondary));
    root.style.setProperty('--accent', hexToHSL(theme.colors.accent));
    
    // Fonts
    if (theme.font.family !== 'Inter') {
      loadGoogleFont(theme.font.family);
      root.style.setProperty('--font-family', theme.font.family);
    }
    if (theme.font.heading !== 'Inter') {
      loadGoogleFont(theme.font.heading);
      root.style.setProperty('--font-heading', theme.font.heading);
    }
    
    // Border radius
    root.style.setProperty('--radius', theme.radius);
  }, [theme]);

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme((current) => ({
      ...current,
      ...newTheme,
      colors: { ...current.colors, ...newTheme.colors },
      font: { ...current.font, ...newTheme.font },
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper functions
function hexToHSL(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find greatest and smallest channel values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }

  // Convert to percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

function loadGoogleFont(fontFamily: string) {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}