import { useState } from 'react';
import { MEMBERSHIPS } from '../../lib/types/membership';
import MembershipCard from '../../components/membership/MembershipCard';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const MembershipSection = () => {
  const { t } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    // Here you would typically integrate with a payment provider
    alert(`Plan ${tier} seleccionado. En un entorno de producción, esto redireccionaría al pago.`);
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">{t('membership.title')}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t('membership.subtitle')}
        </p>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <MembershipCard 
            membership={MEMBERSHIPS.free}
            onSelect={handleSelectTier}
          />
          <MembershipCard 
            membership={MEMBERSHIPS.pro}
            isPopular
            onSelect={handleSelectTier}
          />
        </div>
        <p className="text-sm text-muted-foreground text-center mt-6">
          {t('membership.allPlansInclude')}
        </p>
      </div>
    </div>
  );
};

export default MembershipSection;