import { ArrowRight, Check } from 'lucide-react';
import { Membership } from '../../lib/types/membership';
import { useLanguage } from '../../lib/i18n/LanguageContext';

interface MembershipCardProps {
  membership: Membership;
  isPopular?: boolean;
  onSelect: (tier: Membership['tier']) => void;
}

const MembershipCard = ({ membership, isPopular, onSelect }: MembershipCardProps) => {
  const { t } = useLanguage();

  return (
    <div className={`relative bg-card rounded-lg border p-6 ${isPopular ? 'border-primary shadow-lg' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {t('membership.mostPopular')}
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold capitalize mb-2">
          {membership.tier === 'free' 
            ? t('membership.freeTier.name')
            : t('membership.proTier.name')}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">€{membership.price}</span>
          <span className="text-muted-foreground">{t('membership.perMonth')}</span>
        </div>
        {membership.trialDays && (
          <p className="text-sm text-muted-foreground mt-2">
            {t('membership.freeTier.trial')}
          </p>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {membership.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(membership.tier)}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
          isPopular
            ? 'bg-primary text-white hover:bg-primary-dark'
            : 'border border-input hover:bg-muted'
        }`}
      >
        {t('membership.getStarted')}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default MembershipCard;