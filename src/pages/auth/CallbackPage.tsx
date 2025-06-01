import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../components/ui/LoadingScreen';

export default function CallbackPage() {
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true }); // or '/dashboard'
    }
  }, [isLoading, isAuthenticated, navigate]);

  return <LoadingScreen />;
}
