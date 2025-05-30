import { useState } from 'react';
import { Bell, Globe, Lock, Mail, Moon, Palette, Shield, Sun, User, Plus, Pencil, Trash2 } from 'lucide-react';
import { useTheme } from '../../lib/theme/ThemeContext';
import { useDoctors, Doctor } from '../../lib/doctors/DoctorsContext';

const FONT_OPTIONS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans',
  'Lato',
];

const RADIUS_OPTIONS = [
  { label: 'None', value: '0' },
  { label: 'Small', value: '0.25rem' },
  { label: 'Medium', value: '0.5rem' },
  { label: 'Large', value: '0.75rem' },
  { label: 'Extra Large', value: '1rem' },
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SettingsPage = () => {
  const { theme, darkMode, updateTheme, toggleDarkMode } = useTheme();
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useDoctors();
  const [showColorPicker, setShowColorPicker] = useState<'primary' | 'secondary' | 'accent' | null>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [doctorForm, setDoctorForm] = useState<Partial<Doctor>>({
    name: '',
    email: '',
    specialization: '',
    phone: '',
    schedule: {
      start: '09:00',
      end: '17:00',
      daysOff: [0, 6],
    },
  });

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    updateTheme({
      colors: {
        [type]: color,
      },
    });
    setShowColorPicker(null);
  };

  const handleAddDoctor = () => {
    setDoctorForm({
      name: '',
      email: '',
      specialization: '',
      phone: '',
      schedule: {
        start: '09:00',
        end: '17:00',
        daysOff: [0, 6],
      },
    });
    setEditingDoctor(null);
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setDoctorForm(doctor);
    setEditingDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleSaveDoctor = () => {
    if (editingDoctor) {
      updateDoctor(editingDoctor.id, doctorForm);
    } else {
      addDoctor({
        id: Math.random().toString(36).substr(2, 9),
        ...doctorForm as Doctor,
      });
    }
    setShowDoctorModal(false);
  };

  const handleDeleteDoctor = (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      removeDoctor(id);
    }
  };

  const toggleDayOff = (day: number) => {
    const currentDaysOff = doctorForm.schedule?.daysOff || [];
    const newDaysOff = currentDaysOff.includes(day)
      ? currentDaysOff.filter(d => d !== day)
      : [...currentDaysOff, day];
    
    setDoctorForm(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule!,
        daysOff: newDaysOff,
      },
    }));
  };

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
          <div className="p-4 space-y-6">
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
              <h3 className="text-sm font-medium">Colors</h3>
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
              <h3 className="text-sm font-medium">Typography</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Base Font</label>
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
                  <label className="text-sm text-muted-foreground">Heading Font</label>
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
              <h3 className="text-sm font-medium">Border Radius</h3>
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
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Management */}
        <div className="md:col-span-2 rounded-lg border bg-card">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Doctors Management</h2>
            <button
              onClick={handleAddDoctor}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </button>
          </div>
          <div className="divide-y">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={doctorForm.name}
                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={doctorForm.email}
                  onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={doctorForm.phone}
                  onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Working Hours</label>
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground">Start Time</label>
                    <input
                      type="time"
                      value={doctorForm.schedule?.start}
                      onChange={(e) => setDoctorForm({
                        ...doctorForm,
                        schedule: { ...doctorForm.schedule!, start: e.target.value }
                      })}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground">End Time</label>
                    <input
                      type="time"
                      value={doctorForm.schedule?.end}
                      onChange={(e) => setDoctorForm({
                        ...doctorForm,
                        schedule: { ...doctorForm.schedule!, end: e.target.value }
                      })}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Days Off</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDayOff(index)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        doctorForm.schedule?.daysOff.includes(index)
                          ? 'bg-primary text-white'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowDoctorModal(false)}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDoctor}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                {editingDoctor ? 'Save Changes' : 'Add Doctor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;