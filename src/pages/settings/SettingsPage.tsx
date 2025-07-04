import { useState } from 'react';
import { Bell, Globe, Lock, Mail, Moon, Palette, Shield, Sun, User } from 'lucide-react';
import { useTheme } from '../../lib/theme/ThemeContext';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const FONT_OPTIONS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans',
  'Lato',
];

const RADIUS_OPTIONS = [
  { label: 'none', value: '0' },
  { label: 'small', value: '0.25rem' },
  { label: 'medium', value: '0.5rem' },
  { label: 'large', value: '0.75rem' },
  { label: 'extraLarge', value: '1rem' },
];

const SettingsPage = () => {
  const { t } = useLanguage();
  const { theme, darkMode, updateTheme, toggleDarkMode } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState<'primary' | 'secondary' | 'accent' | null>(null);

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    updateTheme({
      colors: {
        [type]: color,
      },
    });
    setShowColorPicker(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h1>
        <p className="text-muted-foreground">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">{t('settings.account.title')}</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Dr. Morgan</p>
                  <p className="text-sm text-muted-foreground">morgan@dentasync.com</p>
                </div>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">
                {t('common.edit')}
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('settings.account.passwordSecurity')}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('settings.account.notifications')}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">{t('settings.appearance.title')}</h2>
          </div>
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? (
                  <Moon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">{t('settings.appearance.darkMode')}</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Color Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">{t('settings.appearance.colors')}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Primary</label>
                  <button
                    className="h-10 w-full rounded-md border"
                    style={{ backgroundColor: theme.colors.primary }}
                    onClick={() => setShowColorPicker('primary')}
                  />
                  {showColorPicker === 'primary' && (
                    <div className="absolute mt-2 p-2 bg-card rounded-md border shadow-lg">
                      <div className="grid grid-cols-5 gap-2">
                        {['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'].map((color) => (
                          <button
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color, 'primary')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Secondary</label>
                  <button
                    className="h-10 w-full rounded-md border"
                    style={{ backgroundColor: theme.colors.secondary }}
                    onClick={() => setShowColorPicker('secondary')}
                  />
                  {showColorPicker === 'secondary' && (
                    <div className="absolute mt-2 p-2 bg-card rounded-md border shadow-lg">
                      <div className="grid grid-cols-5 gap-2">
                        {['#3f9b9b', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9'].map((color) => (
                          <button
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color, 'secondary')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Accent</label>
                  <button
                    className="h-10 w-full rounded-md border"
                    style={{ backgroundColor: theme.colors.accent }}
                    onClick={() => setShowColorPicker('accent')}
                  />
                  {showColorPicker === 'accent' && (
                    <div className="absolute mt-2 p-2 bg-card rounded-md border shadow-lg">
                      <div className="grid grid-cols-5 gap-2">
                        {['#f97316', '#ef4444', '#ec4899', '#f59e0b', '#84cc16'].map((color) => (
                          <button
                            key={color}
                            className="w-6 h-6 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color, 'accent')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Font Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">{t('settings.appearance.typography.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    {t('settings.appearance.typography.baseFont')}
                  </label>
                  <select
                    value={theme.font.family}
                    onChange={(e) => updateTheme({ font: { family: e.target.value } })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    {t('settings.appearance.typography.headingFont')}
                  </label>
                  <select
                    value={theme.font.heading}
                    onChange={(e) => updateTheme({ font: { heading: e.target.value } })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Border Radius Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">{t('settings.appearance.borderRadius.title')}</h3>
              <div className="grid grid-cols-5 gap-2">
                {RADIUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateTheme({ radius: option.value })}
                    className={`p-2 text-xs font-medium rounded-md border ${
                      theme.radius === option.value
                        ? 'bg-primary text-white'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {t(`settings.appearance.borderRadius.${option.label}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;