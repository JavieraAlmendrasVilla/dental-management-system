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
    auth: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      welcome: 'Welcome Back',
      continueWithGoogle: 'Continue with Google',
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
    dashboard: {
      welcome: 'Welcome back, Dr. Morgan',
      todayOverview: "Today's Overview",
      stats: {
        appointments: "Today's Appointments",
        completed: 'Completed',
        newPatients: 'New Patients',
        totalPatients: 'Total Patients',
        treatments: 'Treatments',
      }
    },
    appointments: {
      title: 'Appointments',
      subtitle: 'Schedule and manage patient appointments',
      newAppointment: 'New Appointment',
      today: 'Today',
      available: 'Available',
      noAppointments: 'No appointments found for the selected date.',
      schedule: 'Schedule Appointment',
      view: {
        day: 'Day',
        week: 'Week',
        list: 'List'
      },
      form: {
        patientName: 'Patient Name',
        patientId: 'Patient ID',
        date: 'Date',
        time: 'Time',
        duration: 'Duration (minutes)',
        type: 'Type',
        dentist: 'Doctor',
        notes: 'Notes',
        notesPlaceholder: 'Add any additional notes...',
        createAppointment: 'Create Appointment'
      },
      status: {
        scheduled: 'Scheduled',
        completed: 'Completed',
        cancelled: 'Cancelled',
        'in-progress': 'In Progress'
      }
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
    auth: {
      signIn: 'Iniciar Sesión',
      signOut: 'Cerrar Sesión',
      welcome: 'Bienvenido de nuevo',
      continueWithGoogle: 'Continuar con Google',
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
    dashboard: {
      welcome: 'Bienvenido de nuevo, Dr. Morgan',
      todayOverview: "Resumen del Día",
      stats: {
        appointments: "Citas de Hoy",
        completed: 'Completadas',
        newPatients: 'Nuevos Pacientes',
        totalPatients: 'Total de Pacientes',
        treatments: 'Tratamientos',
      }
    },
    appointments: {
      title: 'Citas',
      subtitle: 'Programar y gestionar citas de pacientes',
      newAppointment: 'Nueva Cita',
      today: 'Hoy',
      available: 'Disponible',
      noAppointments: 'No se encontraron citas para la fecha seleccionada.',
      schedule: 'Programar Cita',
      view: {
        day: 'Día',
        week: 'Semana',
        list: 'Lista'
      },
      form: {
        patientName: 'Nombre del Paciente',
        patientId: 'ID del Paciente',
        date: 'Fecha',
        time: 'Hora',
        duration: 'Duración (minutos)',
        type: 'Tipo',
        dentist: 'Doctor',
        notes: 'Notas',
        notesPlaceholder: 'Agregar notas adicionales...',
        createAppointment: 'Crear Cita'
      },
      status: {
        scheduled: 'Programada',
        completed: 'Completada',
        cancelled: 'Cancelada',
        'in-progress': 'En Proceso'
      }
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
    }
  }
};