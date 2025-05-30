import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  phone: string;
  avatar?: string;
  schedule: {
    start: string;
    end: string;
    daysOff: number[];
  };
}

interface DoctorsContextType {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  setCurrentDoctor: (doctor: Doctor) => void;
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  removeDoctor: (id: string) => void;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

// Mock initial doctors data
const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Morgan',
    email: 'morgan@dentasync.com',
    specialization: 'General Dentistry',
    phone: '(555) 123-4567',
    schedule: {
      start: '09:00',
      end: '17:00',
      daysOff: [0, 6], // Sunday and Saturday
    },
  },
  {
    id: '2',
    name: 'Dr. Anderson',
    email: 'anderson@dentasync.com',
    specialization: 'Orthodontics',
    phone: '(555) 234-5678',
    schedule: {
      start: '08:00',
      end: '16:00',
      daysOff: [0, 6],
    },
  },
];

// Validate doctor data structure
function isValidDoctor(doctor: any): doctor is Doctor {
  return (
    doctor &&
    typeof doctor.id === 'string' &&
    typeof doctor.name === 'string' &&
    typeof doctor.email === 'string' &&
    typeof doctor.specialization === 'string' &&
    typeof doctor.phone === 'string' &&
    doctor.schedule &&
    typeof doctor.schedule.start === 'string' &&
    typeof doctor.schedule.end === 'string' &&
    Array.isArray(doctor.schedule.daysOff) &&
    doctor.schedule.daysOff.every((day: any) => typeof day === 'number')
  );
}

// Load and validate doctors from localStorage
function loadDoctorsFromStorage(): Doctor[] {
  try {
    const saved = localStorage.getItem('dentasync-doctors');
    if (!saved) return initialDoctors;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return initialDoctors;

    const validDoctors = parsed.filter(isValidDoctor);
    return validDoctors.length > 0 ? validDoctors : initialDoctors;
  } catch (error) {
    console.error('Error loading doctors from storage:', error);
    return initialDoctors;
  }
}

// Load and validate current doctor from localStorage
function loadCurrentDoctorFromStorage(doctors: Doctor[]): Doctor | null {
  try {
    const saved = localStorage.getItem('dentasync-current-doctor');
    if (!saved) return doctors[0] || null;

    const parsed = JSON.parse(saved);
    return isValidDoctor(parsed) ? parsed : doctors[0] || null;
  } catch (error) {
    console.error('Error loading current doctor from storage:', error);
    return doctors[0] || null;
  }
}

export function DoctorsProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(loadDoctorsFromStorage);
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(() => 
    loadCurrentDoctorFromStorage(loadDoctorsFromStorage())
  );

  useEffect(() => {
    localStorage.setItem('dentasync-doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    if (currentDoctor) {
      localStorage.setItem('dentasync-current-doctor', JSON.stringify(currentDoctor));
    }
  }, [currentDoctor]);

  const addDoctor = (doctor: Doctor) => {
    if (!isValidDoctor(doctor)) {
      console.error('Invalid doctor data:', doctor);
      return;
    }
    setDoctors((current) => [...current, doctor]);
  };

  const updateDoctor = (id: string, doctorUpdate: Partial<Doctor>) => {
    setDoctors((current) =>
      current.map((doc) =>
        doc.id === id ? { ...doc, ...doctorUpdate } : doc
      )
    );
    
    if (currentDoctor?.id === id) {
      setCurrentDoctor((current) => current ? { ...current, ...doctorUpdate } : null);
    }
  };

  const removeDoctor = (id: string) => {
    setDoctors((current) => current.filter((doc) => doc.id !== id));
    if (currentDoctor?.id === id) {
      setCurrentDoctor(doctors.find((doc) => doc.id !== id) || null);
    }
  };

  return (
    <DoctorsContext.Provider
      value={{
        doctors,
        currentDoctor,
        setCurrentDoctor,
        addDoctor,
        updateDoctor,
        removeDoctor,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorsContext);
  if (context === undefined) {
    throw new Error('useDoctors must be used within a DoctorsProvider');
  }
  return context;
}