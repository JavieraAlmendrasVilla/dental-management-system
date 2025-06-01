import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
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
const Login = lazy(() => import('./pages/auth/LoginPage'));
const Settings = lazy(() => import('./pages/settings/SettingsPage'));
const WebsiteBuilder = lazy(() => import('./pages/website-builder/WebsiteBuilderPage'));
const Doctors = lazy(() => import('./pages/doctors/DoctorsPage'));
const Membership = lazy(() => import('./pages/membership/MembershipPage'));

// Template routes
const ModernClinicTemplate = lazy(() => import('./pages/templates/ModernClinicTemplate'));
const FamilyDentistryTemplate = lazy(() => import('./pages/templates/FamilyDentistryTemplate'));
const SpecialistPracticeTemplate = lazy(() => import('./pages/templates/SpecialistPracticeTemplate'));

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login\" replace />} />
        </Routes>
      </Suspense>
    );
  }

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
          <Route path="membership" element={<Membership />} />
        </Route>

        {/* Template Routes */}
        <Route path="/templates/modern-clinic" element={<ModernClinicTemplate />} />
        <Route path="/templates/family-dentistry" element={<FamilyDentistryTemplate />} />
        <Route path="/templates/specialist-practice" element={<SpecialistPracticeTemplate />} />

        <Route path="/login" element={<Navigate to="/\" replace />} />
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;