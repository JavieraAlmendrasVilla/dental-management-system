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
      'Gestión de Pacientes',
      'Programación de Citas',
      'Planificación Básica de Tratamientos',
      'Fichas Dentales Digitales',
      'Informes Básicos',
      'Soporte por Email'
    ]
  },
  pro: {
    tier: 'pro',
    price: 50,
    features: [
      'Todo lo incluido en el Plan Gratuito',
      'Resumen de Citas con IA',
      'Creación de Plan de Tratamiento con IA',
      'Análisis Avanzado',
      'Informes Personalizados',
      'Soporte Prioritario',
      'Capacitación del Personal',
      'Soporte para Múltiples Ubicaciones'
    ]
  }
};