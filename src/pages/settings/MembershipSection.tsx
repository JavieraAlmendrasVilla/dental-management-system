import { useState } from 'react';
import { MEMBERSHIPS } from '../../lib/types/membership';
import MembershipCard from '../../components/membership/MembershipCard';

const MembershipSection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    // Here you would typically integrate with a payment provider
    alert(`Selected ${tier} tier. In a production environment, this would redirect to payment.`);
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Membership Plans</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the plan that best fits your practice
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
          All plans include updates and basic customer support
        </p>
      </div>
    </div>
  );
};

export default MembershipSection;