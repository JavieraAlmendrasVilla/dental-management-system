import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Bluetooth as Tooth } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle authentication here
    // For this demo, we'll just redirect to the dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Left side - Branding */}
      <div className="hidden sm:flex sm:w-1/2 bg-primary justify-center items-center p-8">
        <div className="max-w-md text-white">
          <div className="flex items-center mb-8">
            <Tooth className="h-12 w-12 mr-4" />
            <h1 className="text-3xl font-bold">DentaSync</h1>
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
            <h1 className="text-2xl font-bold">DentaSync</h1>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-input bg-background"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-muted-foreground">
                Remember me for 30 days
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary hover:underline">
              Contact your administrator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;