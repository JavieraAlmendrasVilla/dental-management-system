import { useState } from 'react';
import { MEMBERSHIPS } from '../../lib/types/membership';
import MembershipCard from '../../components/membership/MembershipCard';
import { useLanguage } from '../../lib/i18n/LanguageContext';

const MembershipPage = () => {
  const { t } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    // Here you would typically integrate with a payment provider
    alert(`Selected plan: ${tier}. In production, this would redirect to payment.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t('membership.title')}</h1>
        <p className="text-muted-foreground">
          {t('membership.subtitle')}
        </p>
      </div>

      <div className="rounded-lg border bg-card">
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
    </div>
  );
};

export default MembershipPage;