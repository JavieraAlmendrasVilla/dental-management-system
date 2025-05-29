import { useState } from 'react';
import { Bell, Globe, Lock, Mail, Moon, Palette, Shield, Sun, User } from 'lucide-react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Account Settings</h2>
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
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                <div className="flex items-center space-x-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Password & Security</span>
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
                  <span className="text-sm font-medium">Notifications</span>
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
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {darkMode ? (
                  <Moon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Color</label>
              <div className="grid grid-cols-5 gap-2">
                {['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                  <button
                    key={color}
                    className="h-8 w-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">System</h2>
          </div>
          <div className="p-4 space-y-4">
            <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Language & Region</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">English (US)</span>
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
              </div>
            </button>
            <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email Settings</span>
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

        {/* Privacy Settings */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Privacy & Data</h2>
          </div>
          <div className="p-4 space-y-4">
            <button className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Privacy Settings</span>
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
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Cookie Preferences</span>
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
    </div>
  );
};

export default SettingsPage;