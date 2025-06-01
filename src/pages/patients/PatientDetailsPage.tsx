import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, History, Mail, MapPin, Phone, CalendarHeart as Tooth, User } from 'lucide-react';
import { formatDate } from '../../lib/utils';

// Mock patient data - would be fetched from an API in a real app
const PATIENT = {
  id: '1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Anytown, CA 12345',
  dateOfBirth: '1985-06-15',
  gender: 'Male',
  insuranceProvider: 'BlueCross BlueShield',
  insuranceNumber: 'BC123456789',
  allergies: ['Penicillin', 'Latex'],
  medicalConditions: ['Hypertension', 'Diabetes Type 2'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  notes: 'Patient prefers morning appointments. Has dental anxiety, consider sedation for complex procedures.',
  lastVisit: '2023-09-10',
  registeredDate: '2020-03-15',
};

// Mock appointment history
const APPOINTMENT_HISTORY = [
  {
    id: '1',
    date: '2023-09-10',
    time: '10:30 AM',
    type: 'Regular Checkup',
    dentist: 'Dr. Morgan',
    notes: 'Cleaning performed. No cavities found.',
    completed: true,
  },
  {
    id: '2',
    date: '2023-06-05',
    time: '2:00 PM',
    type: 'Filling',
    dentist: 'Dr. Morgan',
    notes: 'Filled cavity on lower right molar (#30).',
    completed: true,
  },
  {
    id: '3',
    date: '2023-03-12',
    time: '11:15 AM',
    type: 'Regular Checkup',
    dentist: 'Dr. Anderson',
    notes: 'X-rays taken. Recommended improved flossing routine.',
    completed: true,
  },
  {
    id: '4',
    date: '2023-12-15',
    time: '9:00 AM',
    type: 'Regular Checkup',
    dentist: 'Dr. Morgan',
    notes: 'Scheduled cleaning and examination.',
    completed: false,
  },
];

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we'd fetch the patient data based on the ID
  // For now, we'll just use our mock data
  const patient = PATIENT;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{patient.name}</h1>
          <p className="text-muted-foreground">
            Patient ID: {id} • Registered: {formatDate(patient.registeredDate)}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </button>
          <button 
            onClick={() => navigate(`/dental-chart/${id}`)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Tooth className="mr-2 h-4 w-4" />
            Dental Chart
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>Full Name</span>
                </div>
                <p>{patient.name}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date of Birth</span>
                </div>
                <p>{formatDate(patient.dateOfBirth)} ({new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years)</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4" />
                  <span>Gender</span>
                </div>
                <p>{patient.gender}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </div>
                <p>{patient.email}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Phone</span>
                </div>
                <p>{patient.phone}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Address</span>
                </div>
                <p>{patient.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Medical Information</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
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
                  className="mr-2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>Allergies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy) => (
                  <span 
                    key={allergy} 
                    className="inline-flex rounded-full bg-error/10 px-2 py-1 text-xs font-medium text-error"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
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
                  className="mr-2"
                >
                  <path d="M16 2H8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Z" />
                  <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M16 18.5a4 4 0 0 0-8 0" />
                </svg>
                <span>Medical Conditions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.medicalConditions.map((condition) => (
                  <span 
                    key={condition} 
                    className="inline-flex rounded-full bg-warning/10 px-2 py-1 text-xs font-medium text-warning"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
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
                  className="mr-2"
                >
                  <path d="m9 12 2 2 4-4" />
                  <path d="M12 3v4" />
                  <path d="M18 6.6a9 9 0 1 1-12 0" />
                </svg>
                <span>Current Medications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.medications.map((medication) => (
                  <span 
                    key={medication} 
                    className="inline-flex rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary"
                  >
                    {medication}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
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
                  className="mr-2"
                >
                  <path d="M9 10h.01" />
                  <path d="M15 10h.01" />
                  <path d="M12 18a6 6 0 0 0 6-6c0-.7-.14-1.37-.4-2" />
                  <path d="M5.24 11.74A5.95 5.95 0 0 0 6 12a6 6 0 0 0 6 6" />
                  <path d="M2 2a20.95 20.95 0 0 1 4.5 4.5" />
                  <path d="M2 8a16.3 16.3 0 0 0 3 2" />
                  <path d="M22 2a20.95 20.95 0 0 0-4.5 4.5" />
                  <path d="M22 8a16.3 16.3 0 0 1-3 2" />
                </svg>
                <span>Insurance</span>
              </div>
              <div>
                <p>{patient.insuranceProvider}</p>
                <p className="text-sm text-muted-foreground">Policy: {patient.insuranceNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Appointment History</h2>
          <button className="text-sm font-medium text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="divide-y">
          {APPOINTMENT_HISTORY.map((appointment) => (
            <div key={appointment.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex">
                  <div className="mr-4 mt-0.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      appointment.completed 
                        ? 'bg-success/10 text-success' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {appointment.completed ? (
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
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <Calendar className="h-5 w-5" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{appointment.type}</h3>
                      <span 
                        className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                          appointment.completed 
                            ? 'bg-success/10 text-success' 
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {appointment.completed ? 'Completed' : 'Scheduled'}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(appointment.date)}</span>
                      <span className="mx-1">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{appointment.time}</span>
                      <span className="mx-1">•</span>
                      <User className="mr-1 h-4 w-4" />
                      <span>{appointment.dentist}</span>
                    </div>
                    {appointment.notes && (
                      <div className="mt-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <FileText className="mr-1 h-4 w-4" />
                          <span>Notes</span>
                        </div>
                        <p className="mt-1">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                {appointment.completed && (
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                    <History className="mr-1.5 h-4 w-4" />
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Notes</h2>
        </div>
        <div className="p-4">
          <p>{patient.notes}</p>
          <div className="mt-4">
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
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
                className="mr-2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;