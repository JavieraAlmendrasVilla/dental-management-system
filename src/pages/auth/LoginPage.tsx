import { useAuth0 } from '@auth0/auth0-react';
import { Calendar-heart as Tooth } from 'lucide-react';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useLanguage();

  const handleGoogleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Branding */}
      <div className="hidden sm:flex sm:w-1/2 bg-primary justify-center items-center p-8">
        <div className="max-w-md text-white">
          <div className="flex items-center mb-8">
            <Tooth className="h-12 w-12 mr-4" />
            <h1 className="text-3xl font-bold">InnoDent</h1>
          </div>
          <h2 className="text-2xl font-bold mb-6">Welcome to the future of dental practice management</h2>
          <p className="mb-6 text-primary-light">
            Streamline your dental practice with our comprehensive management solution. 
            Manage appointments, patient records, treatments, and more in one secure platform.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-dark rounded-lg p-4">
              <h3 className="font-semibold mb-2">Patient Management</h3>
              <p className="text-sm text-primary-light">
                Comprehensive patient records and dental charts
              </p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <h3 className="font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-sm text-primary-light">
                Efficient appointment booking and management
              </p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <h3 className="font-semibold mb-2">Treatment Planning</h3>
              <p className="text-sm text-primary-light">
                Detailed treatment plans and progress tracking
              </p>
            </div>
            <div className="bg-primary-dark rounded-lg p-4">
              <h3 className="font-semibold mb-2">Billing & Payments</h3>
              <p className="text-sm text-primary-light">
                Streamlined invoicing and payment processing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="sm:hidden flex items-center justify-center mb-8">
            <Tooth className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">InnoDent</h1>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Welcome to InnoDent</h2>
            <p className="text-muted-foreground mt-2">
              Sign in to continue to your account
            </p>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5 mr-3" 
            />
            Continue with Google
          </button>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <a href="#" className="font-medium text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="font-medium text-primary hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;