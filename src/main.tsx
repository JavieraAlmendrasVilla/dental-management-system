import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { LanguageProvider } from './lib/i18n/LanguageContext';
import { ThemeProvider } from './lib/theme/ThemeContext';
import { DoctorsProvider } from './lib/doctors/DoctorsContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <DoctorsProvider>
              <App />
            </DoctorsProvider>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);