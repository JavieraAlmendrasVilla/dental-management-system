import { Translations } from './types';

export const translations: Translations = {
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      viewAll: 'View all',
      today: 'Today',
      upcoming: 'Upcoming',
      completed: 'Completed',
      registered: 'Registered',
      completedToday: 'Completed today',
      available: 'Available',
      notes: 'Notes',
      actions: 'Actions',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        scheduled: 'Scheduled',
        paid: 'Paid',
        pending: 'Pending',
        overdue: 'Overdue'
      }
    },
    navigation: {
      dashboard: 'Dashboard',
      patients: 'Patients',
      appointments: 'Appointments',
      treatments: 'Treatments',
      billing: 'Billing',
      reports: 'Reports',
      settings: 'Settings',
      websiteBuilder: 'Website Builder',
      doctors: 'Doctors'
    },
    patients: {
      title: 'Patients',
      subtitle: 'Manage patient records and medical information',
      addNew: 'Add New Patient',
      search: 'Search patients...',
      contact: 'Contact',
      dateOfBirth: 'Date of Birth',
      lastVisit: 'Last Visit',
      nextAppointment: 'Next Appointment',
      noneScheduled: 'None scheduled',
      medicalInfo: {
        allergies: 'Allergies',
        conditions: 'Medical Conditions',
        medications: 'Current Medications'
      }
    },
    treatments: {
      title: 'Treatments',
      subtitle: 'Manage dental treatments and procedures',
      addNew: 'Add Treatment',
      search: 'Search treatments...',
      category: 'Category',
      duration: 'Duration',
      cost: 'Cost',
      description: 'Description',
      recentTreatments: 'Recent Treatments'
    },
    billing: {
      title: 'Billing',
      subtitle: 'Manage invoices and payments',
      createInvoice: 'Create Invoice',
      totalRevenue: 'Total Revenue',
      pendingPayments: 'Pending Payments',
      overduePayments: 'Overdue Payments',
      averagePaymentTime: 'Average Payment Time'
    },
    reports: {
      title: 'Reports',
      subtitle: 'Analytics and performance reports',
      exportReports: 'Export Reports',
      statistics: {
        totalRevenue: 'Total Revenue',
        totalPatients: 'Total Patients',
        treatments: 'Treatments',
        averageVisits: 'Average Visits'
      }
    },
    doctors: {
      title: 'Doctors',
      subtitle: 'Manage doctors and their schedules',
      addNew: 'Add Doctor',
      search: 'Search doctors...',
      schedule: {
        workingHours: 'Working Hours',
        daysOff: 'Days Off',
        startTime: 'Start Time',
        endTime: 'End Time'
      }
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account settings and preferences',
      sections: {
        account: 'Account Settings',
        appearance: 'Appearance',
        notifications: 'Notifications',
        security: 'Security'
      }
    },
    membership: {
      title: 'Membership',
      subtitle: 'Choose the plan that best fits your needs',
      mostPopular: 'Most Popular',
      perMonth: '/month',
      getStarted: 'Get Started',
      allPlansInclude: 'All plans include basic features',
      freeTier: {
        name: 'Free',
        trial: '3 months free trial, then €15/month'
      },
      proTier: {
        name: 'Pro',
        description: 'Advanced features for growing practices'
      }
    }
  },
  es: {
    common: {
      loading: 'Cargando...',
      save: 'Guardar',
      cancel: 'Cancelar',
      edit: 'Editar',
      delete: 'Eliminar',
      search: 'Buscar',
      filter: 'Filtrar',
      viewAll: 'Ver todo',
      today: 'Hoy',
      upcoming: 'Próximo',
      completed: 'Completado',
      registered: 'Registrado',
      completedToday: 'Completado hoy',
      available: 'Disponible',
      notes: 'Notas',
      actions: 'Acciones',
      status: {
        completed: 'Completado',
        inProgress: 'En Proceso',
        scheduled: 'Programado',
        paid: 'Pagado',
        pending: 'Pendiente',
        overdue: 'Vencido'
      }
    },
    navigation: {
      dashboard: 'Panel de Control',
      patients: 'Pacientes',
      appointments: 'Citas',
      treatments: 'Tratamientos',
      billing: 'Facturación',
      reports: 'Informes',
      settings: 'Configuración',
      websiteBuilder: 'Constructor de Sitio Web',
      doctors: 'Doctores'
    },
    patients: {
      title: 'Pacientes',
      subtitle: 'Gestionar registros e información médica de pacientes',
      addNew: 'Agregar Nuevo Paciente',
      search: 'Buscar pacientes...',
      contact: 'Contacto',
      dateOfBirth: 'Fecha de Nacimiento',
      lastVisit: 'Última Visita',
      nextAppointment: 'Próxima Cita',
      noneScheduled: 'Sin programar',
      medicalInfo: {
        allergies: 'Alergias',
        conditions: 'Condiciones Médicas',
        medications: 'Medicamentos Actuales'
      }
    },
    treatments: {
      title: 'Tratamientos',
      subtitle: 'Gestionar tratamientos y procedimientos dentales',
      addNew: 'Agregar Tratamiento',
      search: 'Buscar tratamientos...',
      category: 'Categoría',
      duration: 'Duración',
      cost: 'Costo',
      description: 'Descripción',
      recentTreatments: 'Tratamientos Recientes'
    },
    billing: {
      title: 'Facturación',
      subtitle: 'Gestionar facturas y pagos',
      createInvoice: 'Crear Factura',
      totalRevenue: 'Ingresos Totales',
      pendingPayments: 'Pagos Pendientes',
      overduePayments: 'Pagos Vencidos',
      averagePaymentTime: 'Tiempo Promedio de Pago'
    },
    reports: {
      title: 'Informes',
      subtitle: 'Análisis y reportes de rendimiento',
      exportReports: 'Exportar Informes',
      statistics: {
        totalRevenue: 'Ingresos Totales',
        totalPatients: 'Total de Pacientes',
        treatments: 'Tratamientos',
        averageVisits: 'Promedio de Visitas'
      }
    },
    doctors: {
      title: 'Doctores',
      subtitle: 'Gestionar doctores y sus horarios',
      addNew: 'Agregar Doctor',
      search: 'Buscar doctores...',
      schedule: {
        workingHours: 'Horario Laboral',
        daysOff: 'Días Libres',
        startTime: 'Hora de Inicio',
        endTime: 'Hora de Fin'
      }
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Gestionar configuración de cuenta y preferencias',
      sections: {
        account: 'Configuración de Cuenta',
        appearance: 'Apariencia',
        notifications: 'Notificaciones',
        security: 'Seguridad'
      }
    },
    membership: {
      title: 'Membresía',
      subtitle: 'Elige el plan que mejor se adapte a tus necesidades',
      mostPopular: 'Más Popular',
      perMonth: '/mes',
      getStarted: 'Comenzar',
      allPlansInclude: 'Todos los planes incluyen características básicas',
      freeTier: {
        name: 'Gratuito',
        trial: '3 meses de prueba gratis, luego €15/mes'
      },
      proTier: {
        name: 'Pro',
        description: 'Características avanzadas para clínicas en crecimiento'
      }
    }
  }
};