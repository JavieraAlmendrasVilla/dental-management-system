import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthProviderProps {
  children: ReactNode;
}

// Callback component to handle redirect after login
const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = `${window.location.origin}/callback`;

  // For development, use mock authentication if env vars are not set
  if (!domain || !clientId) {
    console.warn('Auth0 configuration is missing. Please check your environment variables.');
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        connection: 'google-oauth2',
        prompt: 'select_account',
        scope: 'openid profile email'
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
      <AuthCallback />
    </Auth0Provider>
  );
}