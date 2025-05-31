import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, Plus, Search, User, Stethoscope, Activity } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n/LanguageContext';

// Mock patient data
const PATIENTS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-06-15',
    lastVisit: '2023-09-10',
    nextAppointment: '2023-12-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1990-03-22',
    lastVisit: '2023-10-05',
    nextAppointment: '2023-12-20',
  },
  {
    id: '3',
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1978-11-30',
    lastVisit: '2023-08-18',
    nextAppointment: null,
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '(555) 456-7890',
    dateOfBirth: '1992-09-12',
    lastVisit: '2023-11-01',
    nextAppointment: '2023-12-18',
  },
  {
    id: '5',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    phone: '(555) 567-8901',
    dateOfBirth: '1965-04-25',
    lastVisit: '2023-10-22',
    nextAppointment: '2024-01-05',
  },
];

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const filteredPatients = PATIENTS.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('patients.title')}</h1>
          <p className="text-muted-foreground">
            {t('patients.subtitle')}
          </p>
        </div>
        <div>
          <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            <Plus className="mr-2 h-4 w-4" />
            {t('patients.addNew')}
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={t('patients.search')}
                className="w-full md:w-80 rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Filter className="mr-2 h-4 w-4" />
              {t('common.filter')}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">{t('common.name')}</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">{t('patients.contact')}</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">{t('patients.dateOfBirth')}</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">{t('patients.lastVisit')}</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">{t('patients.nextAppointment')}</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <Link 
                        to={`/patients/${patient.id}`}
                        className="font-medium hover:underline"
                      >
                        {patient.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm">{patient.email}</p>
                      <p className="text-sm text-muted-foreground">{patient.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatDate(patient.dateOfBirth)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatDate(patient.lastVisit)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {patient.nextAppointment ? (
                      formatDate(patient.nextAppointment)
                    ) : (
                      <span className="text-muted-foreground">{t('patients.noneScheduled')}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/dental-chart/${patient.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
                      >
                        <Stethoscope className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/periodontogram/${patient.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
                      >
                        <Activity className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/patients/${patient.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-muted"
                      >
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
                          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    {t('patients.noResults')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;