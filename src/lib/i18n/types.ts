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
    patients: {
      title: string;
      subtitle: string;
      addNew: string;
      search: string;
      noResults: string;
      contact: string;
      dateOfBirth: string;
      lastVisit: string;
      nextAppointment: string;
      noneScheduled: string;
      actions: string;
    };
    appointments: {
      title: string;
      subtitle: string;
      newAppointment: string;
      today: string;
      available: string;
      noAppointments: string;
      schedule: string;
      view: {
        day: string;
        week: string;
        list: string;
      };
    };
    treatments: {
      title: string;
      subtitle: string;
      addNew: string;
      search: string;
      category: string;
      duration: string;
      cost: string;
      description: string;
      recentTreatments: string;
      status: {
        completed: string;
        inProgress: string;
        scheduled: string;
      };
    };
    billing: {
      title: string;
      subtitle: string;
      createInvoice: string;
      totalRevenue: string;
      pendingPayments: string;
      overduePayments: string;
      averagePaymentTime: string;
      status: {
        paid: string;
        pending: string;
        overdue: string;
      };
    };
    websiteBuilder: {
      title: string;
      subtitle: string;
      aiGenerator: string;
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
      customTemplate: {
        title: string;
        description: string;
      };
      preview: {
        title: string;
        mobile: string;
        tablet: string;
        desktop: string;
      };
    };
  };
}