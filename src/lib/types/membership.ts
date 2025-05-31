export type MembershipTier = 'free' | 'pro';

export interface Membership {
  tier: MembershipTier;
  price: number;
  features: string[];
  trialDays?: number;
}

export const MEMBERSHIPS: Record<MembershipTier, Membership> = {
  free: {
    tier: 'free',
    price: 15,
    trialDays: 90,
    features: [
      'Patient Management',
      'Appointment Scheduling',
      'Basic Treatment Planning',
      'Digital Dental Charts',
      'Basic Reports',
      'Email Support'
    ]
  },
  pro: {
    tier: 'pro',
    price: 50,
    features: [
      'Everything in Free tier',
      'AI Appointment Summary',
      'AI Treatment Plan Creation',
      'Advanced Analytics',
      'Custom Reports',
      'Priority Support',
      'Staff Training',
      'Multiple Location Support'
    ]
  }
};