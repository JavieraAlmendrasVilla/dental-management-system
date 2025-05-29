import { Calendar, Bluetooth as Tooth, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../lib/utils';
import { useLanguage } from '../lib/i18n/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  
  // Mock data - would be fetched from an API in a real app
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Smith',
      patientId: '123',
      time: new Date(new Date().setHours(10, 30)),
      type: 'Checkup',
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      patientId: '124',
      time: new Date(new Date().setHours(11, 15)),
      type: 'Root Canal',
    },
    {
      id: 3,
      patientName: 'Robert Davis',
      patientId: '125',
      time: new Date(new Date().setHours(14, 0)),
      type: 'Cleaning',
    },
  ];

  const todayStats = {
    appointmentsTotal: 8,
    appointmentsCompleted: 2,
    newPatients: 1,
    totalPatients: 245,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('navigation.dashboard')}</h1>
          <p className="text-muted-foreground">
            {t('dashboard.welcome')}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm font-medium">
            {formatDate(new Date())}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('dashboard.stats.appointments')}</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">
                {todayStats.appointmentsCompleted}/{todayStats.appointmentsTotal}
              </p>
              <p className="text-xs text-muted-foreground">{t('dashboard.stats.completed')}</p>
            </div>
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('dashboard.stats.newPatients')}</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{todayStats.newPatients}</p>
              <p className="text-xs text-muted-foreground">{t('common.today')}</p>
            </div>
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
              <User className="h-4 w-4 text-secondary" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('dashboard.stats.totalPatients')}</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">{todayStats.totalPatients}</p>
              <p className="text-xs text-muted-foreground">{t('common.registered')}</p>
            </div>
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-4 w-4 text-accent" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
          <div className="flex items-center gap-2">
            <Tooth className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('dashboard.stats.treatments')}</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">{t('common.completedToday')}</p>
            </div>
            <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
              <Tooth className="h-4 w-4 text-success" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('dashboard.todayOverview')}</h2>
          <Link
            to="/appointments"
            className="text-sm font-medium text-primary hover:underline"
          >
            {t('common.viewAll')}
          </Link>
        </div>
        <div className="divide-y">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <Link
                      to={`/patients/${appointment.patientId}`}
                      className="font-medium hover:underline"
                    >
                      {appointment.patientName}
                    </Link>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatTime(appointment.time)}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.time < new Date() ? t('common.completed') : t('common.upcoming')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;