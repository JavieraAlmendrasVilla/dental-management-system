import { useState } from 'react';
import { Bell, Calendar, ChevronLeft, ChevronRight, Clock, Filter, Plus, Search, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../lib/utils';

// Mock appointment data
const APPOINTMENTS = [
  {
    id: '1',
    patientId: '101',
    patientName: 'John Smith',
    date: '2023-12-15',
    time: '09:00',
    duration: 30,
    type: 'Regular Checkup',
    dentist: 'Dr. Morgan',
    notes: 'Regular cleaning and checkup',
    status: 'scheduled',
  },
  {
    id: '2',
    patientId: '102',
    patientName: 'Sarah Johnson',
    date: '2023-12-15',
    time: '10:00',
    duration: 60,
    type: 'Root Canal',
    dentist: 'Dr. Morgan',
    notes: 'Root canal treatment on lower right molar',
    status: 'scheduled',
  },
  {
    id: '3',
    patientId: '103',
    patientName: 'Michael Williams',
    date: '2023-12-15',
    time: '11:30',
    duration: 45,
    type: 'Filling',
    dentist: 'Dr. Anderson',
    notes: 'Filling on upper left incisor',
    status: 'scheduled',
  },
  {
    id: '4',
    patientId: '104',
    patientName: 'Emily Davis',
    date: '2023-12-15',
    time: '13:00',
    duration: 30,
    type: 'Consultation',
    dentist: 'Dr. Morgan',
    notes: 'Initial consultation for orthodontic treatment',
    status: 'scheduled',
  },
  {
    id: '5',
    patientId: '105',
    patientName: 'Robert Miller',
    date: '2023-12-15',
    time: '14:00',
    duration: 60,
    type: 'Crown Fitting',
    dentist: 'Dr. Morgan',
    notes: 'Crown fitting for tooth #19',
    status: 'scheduled',
  },
  {
    id: '6',
    patientId: '106',
    patientName: 'Jennifer Taylor',
    date: '2023-12-15',
    time: '15:30',
    duration: 30,
    type: 'Regular Checkup',
    dentist: 'Dr. Anderson',
    notes: 'Regular cleaning and checkup',
    status: 'scheduled',
  },
];

// Time slots for the scheduler
const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

// Dentist list
const DENTISTS = [
  { id: '1', name: 'Dr. Morgan' },
  { id: '2', name: 'Dr. Anderson' },
];

// Treatment types
const TREATMENT_TYPES = [
  'Regular Checkup',
  'Cleaning',
  'Filling',
  'Root Canal',
  'Crown',
  'Bridge',
  'Extraction',
  'Consultation',
  'Emergency',
];

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'list'>('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientId: '',
    date: formatDate(new Date()).split(',')[0],
    time: '09:00',
    duration: '30',
    type: 'Regular Checkup',
    dentist: DENTISTS[0].id,
    notes: '',
  });
  
  // Filter appointments based on the selected date and search term
  const filteredAppointments = APPOINTMENTS.filter((appointment) => {
    const matchesDate = appointment.date === formatDate(selectedDate).replace(/,/g, '');
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDate && (searchTerm === '' || matchesSearch);
  });

  // Navigate to previous day
  const prevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  // Navigate to next day
  const nextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // Navigate to today
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to create the appointment
    console.log('Creating appointment:', newAppointment);
    
    // Add the new appointment to the list (mock implementation)
    const appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: newAppointment.patientId,
      patientName: newAppointment.patientName,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: parseInt(newAppointment.duration),
      type: newAppointment.type,
      dentist: DENTISTS.find(d => d.id === newAppointment.dentist)?.name || '',
      notes: newAppointment.notes,
      status: 'scheduled',
    };
    
    APPOINTMENTS.push(appointment);
    
    // Reset form and close modal
    setNewAppointment({
      patientName: '',
      patientId: '',
      date: formatDate(new Date()).split(',')[0],
      time: '09:00',
      duration: '30',
      type: 'Regular Checkup',
      dentist: DENTISTS[0].id,
      notes: '',
    });
    setShowNewAppointmentModal(false);
  };

  // Get tomorrow's date as the minimum date for scheduling
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get appointments for a specific time slot and dentist
  const getAppointmentsForTimeSlot = (timeSlot: string, dentistId: string) => {
    return filteredAppointments.filter(
      (appointment) => appointment.time === timeSlot && 
      (dentistId === 'all' || appointment.dentist === DENTISTS.find(d => d.id === dentistId)?.name)
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage patient appointments
          </p>
        </div>
        <button 
          onClick={() => setShowNewAppointmentModal(true)}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </button>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">New Appointment</h2>
                <button 
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleCreateAppointment} className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Patient ID</label>
                    <input
                      type="text"
                      value={newAppointment.patientId}
                      onChange={(e) => setNewAppointment({...newAppointment, patientId: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      min={minDate}
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <select
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                    <select
                      value={newAppointment.duration}
                      onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      {TREATMENT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Doctor</label>
                    <select
                      value={newAppointment.dentist}
                      onChange={(e) => setNewAppointment({...newAppointment, dentist: e.target.value})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      {DENTISTS.map((dentist) => (
                        <option key={dentist.id} value={dentist.id}>{dentist.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Notes</label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Add any additional notes..."
                  />
                </div>
              </div>
            </form>
            
            <div className="p-4 border-t">
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                onClick={prevDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                onClick={goToToday}
              >
                Today
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                onClick={nextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="inline-flex items-center rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
                {formatDate(selectedDate)}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'day' ? 'bg-primary text-white' : 'border border-input bg-background hover:bg-muted'
                }`}
                onClick={() => setView('day')}
              >
                Day
              </button>
              <button 
                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'week' ? 'bg-primary text-white' : 'border border-input bg-background hover:bg-muted'
                }`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  view === 'list' ? 'bg-primary text-white' : 'border border-input bg-background hover:bg-muted'
                }`}
                onClick={() => setView('list')}
              >
                List
              </button>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search appointments..."
                  className="w-full md:w-48 rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {view === 'day' && (
          <div className="p-4">
            <div className="grid grid-cols-[64px_repeat(2,1fr)] gap-4">
              {/* Time column */}
              <div className="space-y-4 pr-4 pt-8">
                {TIME_SLOTS.map((time) => (
                  <div key={time} className="h-16 text-right text-sm text-muted-foreground">
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Schedule columns for each dentist */}
              {DENTISTS.map((dentist) => (
                <div key={dentist.id} className="border-l pl-4">
                  <div className="h-8 mb-4 flex items-center font-medium">
                    {dentist.name}
                  </div>
                  <div className="space-y-4">
                    {TIME_SLOTS.map((time) => {
                      const appointments = getAppointmentsForTimeSlot(time, dentist.id);
                      return (
                        <div key={`${dentist.id}-${time}`} className="h-16">
                          {appointments.length > 0 ? (
                            <div 
                              className="h-full rounded-md bg-primary/10 border-l-4 border-primary px-2 py-1 hover:bg-primary/20 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center">
                                <User className="h-4 w-4 text-primary mr-1" />
                                <span className="text-sm font-medium truncate">
                                  {appointments[0].patientName}
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {time} - {appointments[0].type}
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => {
                                setNewAppointment({
                                  ...newAppointment,
                                  time,
                                  dentist: dentist.id,
                                  date: formatDate(selectedDate).split(',')[0]
                                });
                                setShowNewAppointmentModal(true);
                              }}
                              className="h-full w-full rounded-md border border-dashed border-muted hover:border-muted-foreground transition-colors cursor-pointer flex items-center justify-center"
                            >
                              <div className="text-xs text-muted-foreground">Available</div>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'list' && (
          <div className="divide-y">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <div className="mr-4 mt-0.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Link
                            to={`/patients/${appointment.patientId}`}
                            className="font-medium hover:underline"
                          >
                            {appointment.patientName}
                          </Link>
                          <span 
                            className="ml-2 rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary"
                          >
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                          <span className="mx-1">•</span>
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{appointment.time}</span>
                          <span className="mx-1">•</span>
                          <span>{appointment.type}</span>
                          <span className="mx-1">•</span>
                          <User className="mr-1 h-4 w-4" />
                          <span>{appointment.dentist}</span>
                        </div>
                        {appointment.notes && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            Notes: {appointment.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 w-8 hover:bg-muted transition-colors">
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
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 w-8 hover:bg-muted transition-colors">
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
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                No appointments found for the selected date.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;