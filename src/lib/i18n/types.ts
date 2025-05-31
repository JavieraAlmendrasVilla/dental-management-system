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
      viewAll: string;
      today: string;
      upcoming: string;
      completed: string;
      registered: string;
      completedToday: string;
      available: string;
      notes: string;
      actions: string;
      status: {
        completed: string;
        inProgress: string;
        scheduled: string;
        paid: string;
        pending: string;
        overdue: string;
      }
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
      doctors: string;
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
      }
    };
    websiteBuilder: {
      title: string;
      subtitle: string;
      aiGenerator: string;
      generateWebsite: string;
      previewTemplate: string;
      selectTemplate: string;
      customTemplate: {
        title: string;
        description: string;
      };
      templates: {
        modernClinic: {
          name: string;
          description: string;
        };
        familyDentistry: {
          name: string;
          description: string;
        };
        specialistPractice: {
          name: string;
          description: string;
        };
      };
      preview: {
        title: string;
        mobile: string;
        tablet: string;
        desktop: string;
      };
      ai: {
        title: string;
        description: string;
        placeholder: string;
        generating: string;
        error: string;
      }
    };
    // ... rest of the existing translations
  };
}