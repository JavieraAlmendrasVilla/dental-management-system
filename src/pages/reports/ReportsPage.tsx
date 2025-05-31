import { useState } from 'react';
import { BarChart3, Download, Filter, PieChart, TrendingUp, Users } from 'lucide-react';
import { exportToCSV } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n/LanguageContext';

// Mock report data
const REVENUE_DATA = [
  { month: 'Jan', amount: 12500 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
];

const TREATMENT_STATS = {
  totalTreatments: 450,
  completedTreatments: 380,
  canceledTreatments: 20,
  rescheduledTreatments: 50,
};

const PATIENT_STATS = {
  totalPatients: 850,
  newPatients: 45,
  returningPatients: 805,
  averageVisits: 3.2,
};

const ReportsPage = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');

  const handleExportReports = () => {
    // Prepare data for export
    const revenueReport = REVENUE_DATA.map(item => ({
      Month: item.month,
      Revenue: `$${item.amount}`,
    }));

    const treatmentReport = [{
      'Total Treatments': TREATMENT_STATS.totalTreatments,
      'Completed Treatments': TREATMENT_STATS.completedTreatments,
      'Canceled Treatments': TREATMENT_STATS.canceledTreatments,
      'Rescheduled Treatments': TREATMENT_STATS.rescheduledTreatments,
    }];

    const patientReport = [{
      'Total Patients': PATIENT_STATS.totalPatients,
      'New Patients': PATIENT_STATS.newPatients,
      'Returning Patients': PATIENT_STATS.returningPatients,
      'Average Visits': PATIENT_STATS.averageVisits,
    }];

    // Export each report
    exportToCSV(revenueReport, 'revenue-report');
    exportToCSV(treatmentReport, 'treatment-report');
    exportToCSV(patientReport, 'patient-report');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('reports.title')}</h1>
          <p className="text-muted-foreground">
            {t('reports.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">{t('common.thisWeek')}</option>
            <option value="month">{t('common.thisMonth')}</option>
            <option value="quarter">{t('common.thisQuarter')}</option>
            <option value="year">{t('common.thisYear')}</option>
          </select>
          <button 
            onClick={handleExportReports}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            {t('reports.exportReports')}
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('reports.statistics.totalRevenue')}</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">$45,500</p>
            <p className="text-xs text-success">+12.5% {t('common.fromLastMonth')}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('reports.statistics.totalPatients')}</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{PATIENT_STATS.totalPatients}</p>
            <p className="text-xs text-success">+{PATIENT_STATS.newPatients} {t('common.newThisMonth')}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('reports.statistics.treatments')}</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{TREATMENT_STATS.completedTreatments}</p>
            <p className="text-xs text-muted-foreground">
              {t('common.outOf')} {TREATMENT_STATS.totalTreatments} {t('common.total')}
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('reports.statistics.averageVisits')}</span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{PATIENT_STATS.averageVisits}</p>
            <p className="text-xs text-muted-foreground">{t('common.perPatient')}</p>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{t('reports.revenueOverview')}</h2>
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
                <Filter className="mr-2 h-4 w-4" />
                {t('common.filter')}
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="h-[300px] flex items-end justify-between gap-2">
              {REVENUE_DATA.map((data) => (
                <div key={data.month} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-16 bg-primary rounded-t-md transition-all hover:opacity-90"
                    style={{ 
                      height: `${(data.amount / 20000) * 300}px`,
                    }}
                  />
                  <span className="text-sm font-medium">{data.month}</span>
                  <span className="text-sm text-muted-foreground">
                    ${data.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Distribution */}
        <div className="rounded-lg border bg-card">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{t('reports.treatmentDistribution')}</h2>
              <select
                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="all">{t('reports.allTreatments')}</option>
                <option value="completed">{t('common.status.completed')}</option>
                <option value="scheduled">{t('common.status.scheduled')}</option>
              </select>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>{t('reports.completedTreatments')}</span>
                  <span className="font-medium">{TREATMENT_STATS.completedTreatments}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-success" 
                    style={{ 
                      width: `${(TREATMENT_STATS.completedTreatments / TREATMENT_STATS.totalTreatments) * 100}%` 
                    }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>{t('reports.canceledTreatments')}</span>
                  <span className="font-medium">{TREATMENT_STATS.canceledTreatments}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-error" 
                    style={{ 
                      width: `${(TREATMENT_STATS.canceledTreatments / TREATMENT_STATS.totalTreatments) * 100}%` 
                    }} 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>{t('reports.rescheduledTreatments')}</span>
                  <span className="font-medium">{TREATMENT_STATS.rescheduledTreatments}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-warning" 
                    style={{ 
                      width: `${(TREATMENT_STATS.rescheduledTreatments / TREATMENT_STATS.totalTreatments) * 100}%` 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;