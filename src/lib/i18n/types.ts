export type Language = 'en' | 'es';

export interface Translations {
  [key: string]: {
    common: {
      loading: string;
      save: string;
      cancel: string;
      edit: string;
      delete: string;
      search: string;
      filter: string;
    };
    auth: {
      signIn: string;
      signOut: string;
      welcome: string;
      continueWithGoogle: string;
    };
    navigation: {
      dashboard: string;
      patients: string;
      appointments: string;
      treatments: string;
      billing: string;
      reports: string;
      settings: string;
      websiteBuilder: string;
    };
    dashboard: {
      welcome: string;
      todayOverview: string;
      stats: {
        appointments: string;
        completed: string;
        newPatients: string;
        totalPatients: string;
        treatments: string;
      };
    };
  };
}