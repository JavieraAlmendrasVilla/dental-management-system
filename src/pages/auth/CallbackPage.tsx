import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const CallbackPage = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      const result = await handleRedirectCallback();
      const returnTo = result.appState?.returnTo || '/';
      navigate(returnTo, { replace: true });
    };

    processCallback();
  }, [handleRedirectCallback, navigate]);

  return <div>Loading...</div>;
};

export default CallbackPage;

