import { useState } from 'react';
import { Plus, Search, User, Mail, Phone, Calendar, Pencil, Trash2 } from 'lucide-react';
import { useDoctors, Doctor } from '../../lib/doctors/DoctorsContext';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DoctorsPage = () => {
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctors</h1>
          <p className="text-muted-foreground">
            Manage doctors and their schedules
          </p>
        </div>
        <button
          onClick={handleAddDoctor}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search doctors..."
              className="w-full md:w-80 rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-sm text-right">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="mr-1 h-4 w-4" />
                      {doctor.email}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="mr-1 h-4 w-4" />
                      {doctor.phone}
                    </div>
                  </div>
                  <div className="hidden md:block text-sm text-right">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {doctor.schedule.start} - {doctor.schedule.end}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Days off: {doctor.schedule.daysOff.map(day => DAYS[day].slice(0, 3)).join(', ')}
                    </div>
                  </div>
                  <div className="flex gap-2">
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
            </div>
          ))}
          {filteredDoctors.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No doctors found. Try a different search term.
            </div>
          )}
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

export default DoctorsPage;