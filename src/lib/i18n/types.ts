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
      form: {
        patientName: string;
        patientId: string;
        date: string;
        time: string;
        duration: string;
        type: string;
        dentist: string;
        notes: string;
        notesPlaceholder: string;
        createAppointment: string;
      };
      status: {
        scheduled: string;
        completed: string;
        cancelled: string;
        'in-progress': string;
      }
    };
    patients: {
      title: string;
      subtitle: string;
      addNew: string;
      search: string;
      contact: string;
      dateOfBirth: string;
      lastVisit: string;
      nextAppointment: string;
      noneScheduled: string;
      medicalInfo: {
        allergies: string;
        conditions: string;
        medications: string;
      }
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
    };
    billing: {
      title: string;
      subtitle: string;
      createInvoice: string;
      totalRevenue: string;
      pendingPayments: string;
      overduePayments: string;
      averagePaymentTime: string;
    };
    reports: {
      title: string;
      subtitle: string;
      exportReports: string;
      statistics: {
        totalRevenue: string;
        totalPatients: string;
        treatments: string;
        averageVisits: string;
      }
    };
    doctors: {
      title: string;
      subtitle: string;
      addNew: string;
      search: string;
      schedule: {
        workingHours: string;
        daysOff: string;
        startTime: string;
        endTime: string;
      }
    };
    settings: {
      title: string;
      subtitle: string;
      sections: {
        account: string;
        appearance: string;
        notifications: string;
        security: string;
      }
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
  };
}