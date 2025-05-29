import { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import { useDoctors } from '../../lib/doctors/DoctorsContext';

export function DoctorSelector() {
  const { doctors, currentDoctor, setCurrentDoctor } = useDoctors();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </div>
        <span className="hidden text-sm font-medium md:block">
          {currentDoctor?.name || 'Select Doctor'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-card shadow-lg">
          <div className="py-1">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => {
                  setCurrentDoctor(doctor);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  currentDoctor?.id === doctor.id
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-3 w-3" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {doctor.specialization}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}