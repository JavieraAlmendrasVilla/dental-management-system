import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy-loaded routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Patients = lazy(() => import('./pages/patients/PatientsPage'));
const PatientDetails = lazy(() => import('./pages/patients/PatientDetailsPage'));
const Periodontogram = lazy(() => import('./pages/patients/PeriodontogramPage'));
const Appointments = lazy(() => import('./pages/appointments/AppointmentsPage'));
const DentalChart = lazy(() => import('./pages/dental-chart/DentalChartPage'));
const Treatments = lazy(() => import('./pages/treatments/TreatmentsPage'));
const Billing = lazy(() => import('./pages/billing/BillingPage'));
const Reports = lazy(() => import('./pages/reports/ReportsPage'));
const Settings = lazy(() => import('./pages/settings/SettingsPage'));
const WebsiteBuilder = lazy(() => import('./pages/website-builder/WebsiteBuilderPage'));
const Doctors = lazy(() => import('./pages/doctors/DoctorsPage'));

// Template routes
const ModernClinicTemplate = lazy(() => import('./pages/templates/ModernClinicTemplate'));
const FamilyDentistryTemplate = lazy(() => import('./pages/templates/FamilyDentistryTemplate'));
const SpecialistPracticeTemplate = lazy(() => import('./pages/templates/SpecialistPracticeTemplate'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="periodontogram/:patientId" element={<Periodontogram />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="dental-chart/:patientId" element={<DentalChart />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="website-builder" element={<WebsiteBuilder />} />
          <Route path="doctors" element={<Doctors />} />
        </Route>

        {/* Template Routes */}
        <Route path="/templates/modern-clinic" element={<ModernClinicTemplate />} />
        <Route path="/templates/family-dentistry" element={<FamilyDentistryTemplate />} />
        <Route path="/templates/specialist-practice" element={<SpecialistPracticeTemplate />} />

        {/* Redirect unknown routes to root */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;