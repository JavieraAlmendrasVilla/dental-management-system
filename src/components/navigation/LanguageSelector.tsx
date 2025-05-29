import { useLanguage } from '../../lib/i18n/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
    >
      <Globe className="h-5 w-5" />
    </button>
  );
}