import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CallbackPage = () => {
  const { isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
    if (error) {
      console.error('Authentication error:', error);
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
};

export default CallbackPage;