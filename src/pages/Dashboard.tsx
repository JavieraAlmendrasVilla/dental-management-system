import { Calendar, Bluetooth as Tooth, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../lib/utils';
import { useLanguage } from '../lib/i18n/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">{t('dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <Link 
          to="/appointments" 
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.todayAppointments')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.viewSchedule')}</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/patients" 
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.totalPatients')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.viewPatients')}</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/doctors" 
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.activeStaff')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.viewStaff')}</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/treatments" 
          className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 rounded-lg">
              <Tooth className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.treatments')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.viewTreatments')}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;