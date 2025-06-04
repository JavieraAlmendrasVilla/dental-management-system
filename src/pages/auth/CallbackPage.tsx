import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingScreen from '../../components/ui/LoadingScreen';

const CallbackPage = () => {
  const { isAuthenticated, error, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/', { replace: true });
      } else if (error) {
        console.error('Authentication error:', error);
        navigate('/login', { replace: true });
      }
    }
  }, [isAuthenticated, error, isLoading, navigate]);

  return <LoadingScreen />;
};

export default CallbackPage;