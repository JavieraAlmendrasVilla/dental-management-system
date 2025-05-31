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
    doctors: {
      title: string;
      subtitle: string;
      addDoctor: string;
      editDoctor: string;
      search: string;
      noResults: string;
      form: {
        name: string;
        email: string;
        specialization: string;
        phone: string;
        workingHours: string;
        startTime: string;
        endTime: string;
        daysOff: string;
        confirmDelete: string;
      };
      actions: {
        save: string;
        cancel: string;
        edit: string;
        delete: string;
      };
    };
    // ... rest of the existing translations
  };
}