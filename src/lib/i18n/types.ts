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
      name: string;
      email: string;
      phone: string;
      schedule: string;
      status: {
        completed: string;
        inProgress: string;
        scheduled: string;
        paid: string;
        pending: string;
        overdue: string;
      };
      layout: string;
      pageStructure: string;
      design: string;
      colorsAndFonts: string;
      customCode: string;
      cssAndJavaScript: string;
      error: string;
      perMonth: string;
      getStarted: string;
      allPlansInclude: string;
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
    settings: {
      title: string;
      subtitle: string;
      account: {
        title: string;
        personalInfo: string;
        passwordSecurity: string;
        notifications: string;
      };
      appearance: {
        title: string;
        darkMode: string;
        colors: string;
        typography: {
          title: string;
          baseFont: string;
          headingFont: string;
        };
        borderRadius: {
          title: string;
          none: string;
          small: string;
          medium: string;
          large: string;
          extraLarge: string;
        };
      };
    };
    membership: {
      title: string;
      subtitle: string;
      mostPopular: string;
      perMonth: string;
      getStarted: string;
      allPlansInclude: string;
      freeTier: {
        name: string;
        trial: string;
      };
      proTier: {
        name: string;
      };
    };
    // ... rest of the existing translations
  };
}