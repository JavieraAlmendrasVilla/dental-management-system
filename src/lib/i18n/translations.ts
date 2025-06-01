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
      viewAll: 'View All',
      today: 'Today',
      upcoming: 'Upcoming',
      completed: 'Completed',
      registered: 'Registered',
      completedToday: 'Completed Today',
      available: 'Available',
      notes: 'Notes',
      actions: 'Actions',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      schedule: 'Schedule',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        scheduled: 'Scheduled',
        paid: 'Paid',
        pending: 'Pending',
        overdue: 'Overdue',
      },
      layout: 'Layout',
      pageStructure: 'Page Structure',
      design: 'Design',
      colorsAndFonts: 'Colors & Fonts',
      customCode: 'Custom Code',
      cssAndJavaScript: 'CSS & JavaScript',
      error: 'An error occurred',
      perMonth: 'per month',
      getStarted: 'Get Started',
      allPlansInclude: 'All plans include updates and basic support',
      fromLastMonth: 'from last month',
      newThisMonth: 'new this month',
      outOf: 'out of',
      total: 'total',
      perPatient: 'per patient',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      thisQuarter: 'This Quarter',
      thisYear: 'This Year'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account settings and preferences',
      account: {
        title: 'Account Settings',
        personalInfo: 'Personal Information',
        passwordSecurity: 'Password & Security',
        notifications: 'Notifications'
      },
      appearance: {
        title: 'Appearance',
        darkMode: 'Dark Mode',
        colors: 'Colors',
        typography: {
          title: 'Typography',
          baseFont: 'Base Font',
          headingFont: 'Heading Font'
        },
        borderRadius: {
          title: 'Border Radius',
          none: 'None',
          small: 'Small',
          medium: 'Medium',
          large: 'Large',
          extraLarge: 'Extra Large'
        }
      },
      membership: {
        title: 'Membership',
        subtitle: 'Manage your subscription and billing',
        mostPopular: 'Most Popular',
        perMonth: 'per month',
        getStarted: 'Get Started',
        allPlansInclude: 'All plans include updates and basic support',
        freeTier: {
          name: 'Free',
          trial: '90-day free trial'
        },
        proTier: {
          name: 'Pro'
        }
      }
    },
    doctors: {
      title: 'Doctors',
      subtitle: 'Manage doctors and staff information',
      addDoctor: 'Add Doctor',
      editDoctor: 'Edit Doctor',
      search: 'Search doctors...',
      noResults: 'No doctors found',
      form: {
        name: 'Doctor Name',
        email: 'Email Address',
        specialization: 'Specialization',
        phone: 'Phone Number',
        workingHours: 'Working Hours',
        startTime: 'Start Time',
        endTime: 'End Time',
        daysOff: 'Days Off',
        confirmDelete: 'Are you sure you want to delete this doctor?'
      },
      actions: {
        save: 'Save Changes',
        cancel: 'Cancel'
      }
    },
    dashboard: {
      title: 'Dashboard',
      todayAppointments: "Today's Appointments",
      viewSchedule: 'View Schedule',
      totalPatients: 'Total Patients',
      viewPatients: 'View Patients',
      activeStaff: 'Active Staff',
      viewStaff: 'View Staff',
      treatments: 'Treatments',
      viewTreatments: 'View Treatments'
    },
    patients: {
      title: 'Patients',
      subtitle: 'Manage your patient records and information',
      addNew: 'Add New Patient',
      search: 'Search patients...',
      contact: 'Contact Information',
      dateOfBirth: 'Date of Birth',
      lastVisit: 'Last Visit',
      nextAppointment: 'Next Appointment',
      noneScheduled: 'None Scheduled',
      noResults: 'No patients found',
      dentalChart: 'Dental Chart',
      periodontogram: 'Periodontogram',
      records: 'Patient Records'
    },
    appointments: {
      title: 'Appointments',
      subtitle: 'Manage and schedule patient appointments',
      newAppointment: 'New Appointment',
      search: 'Search appointments...',
      available: 'Available',
      noAppointments: 'No appointments found',
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
        dentist: 'Dentist',
        notes: 'Notes',
        notesPlaceholder: 'Add any additional notes or instructions',
        createAppointment: 'Create Appointment'
      },
      status: {
        completed: 'Completed',
        scheduled: 'Scheduled'
      }
    },
    treatments: {
      title: 'Treatments',
      subtitle: 'Manage dental treatments and procedures',
      addNew: 'Add New Treatment',
      search: 'Search treatments...',
      name: 'Treatment Name',
      category: 'Category',
      duration: 'Duration',
      cost: 'Cost',
      description: 'Description',
      recentTreatments: 'Recent Treatments',
      noResults: 'No treatments found',
      allTreatments: 'All Treatments',
      createTreatment: 'Create Treatment',
      form: {
        name: 'Treatment Name',
        category: 'Category',
        duration: 'Duration (minutes)',
        cost: 'Cost ($)',
        description: 'Description',
        descriptionPlaceholder: 'Enter treatment details and notes'
      }
    },
    billing: {
      title: 'Billing',
      subtitle: 'Manage invoices and payments',
      createInvoice: 'Create Invoice',
      totalRevenue: 'Total Revenue',
      pendingPayments: 'Pending Payments',
      overduePayments: 'Overdue Payments',
      averagePaymentTime: 'Average Payment Time',
      revenueOverview: 'Revenue Overview',
      treatmentDistribution: 'Treatment Distribution',
      allTreatments: 'All Treatments',
      completedTreatments: 'Completed Treatments',
      canceledTreatments: 'Canceled Treatments',
      rescheduledTreatments: 'Rescheduled Treatments',
      exportReports: 'Export Reports',
      statistics: {
        totalRevenue: 'Total Revenue',
        totalPatients: 'Total Patients',
        treatments: 'Treatments',
        averageVisits: 'Average Visits'
      }
    },
    reports: {
      title: 'Reports',
      subtitle: 'View and analyze practice performance',
      exportReports: 'Export Reports',
      revenueOverview: 'Revenue Overview',
      treatmentDistribution: 'Treatment Distribution',
      allTreatments: 'All Treatments',
      completedTreatments: 'Completed Treatments',
      canceledTreatments: 'Canceled Treatments',
      rescheduledTreatments: 'Rescheduled Treatments',
      statistics: {
        totalRevenue: 'Total Revenue',
        totalPatients: 'Total Patients',
        treatments: 'Treatments',
        averageVisits: 'Average Visits'
      }
    },
    websiteBuilder: {
      title: 'Website Builder',
      subtitle: 'Create and customize your dental practice website',
      aiGenerator: 'AI Generator',
      generateWebsite: 'Generate Website',
      previewTemplate: 'Preview Template',
      selectTemplate: 'Select a template to preview',
      templates: {
        'modern-clinic': {
          name: 'Modern Clinic',
          description: 'A clean, modern design perfect for contemporary dental practices'
        },
        'family-dentistry': {
          name: 'Family Dentistry',
          description: 'Warm and welcoming design ideal for family dental practices'
        },
        'specialist-practice': {
          name: 'Specialist Practice',
          description: 'Professional design for specialized dental services'
        }
      },
      customTemplate: {
        title: 'Custom Template',
        description: 'Start from scratch and create your own unique design'
      },
      preview: {
        title: 'Preview',
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop'
      },
      ai: {
        title: 'AI Website Generator',
        description: 'Describe your ideal website and let AI create it for you',
        placeholder: 'Describe your dental practice and desired website features...',
        generating: 'Generating...',
        error: 'OpenAI API key is not configured. Please add it to your environment variables.'
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
      viewAll: 'Ver Todo',
      today: 'Hoy',
      upcoming: 'Próximo',
      completed: 'Completado',
      registered: 'Registrado',
      completedToday: 'Completado Hoy',
      available: 'Disponible',
      notes: 'Notas',
      actions: 'Acciones',
      name: 'Nombre',
      email: 'Correo',
      phone: 'Teléfono',
      schedule: 'Horario',
      status: {
        completed: 'Completado',
        inProgress: 'En Progreso',
        scheduled: 'Programado',
        paid: 'Pagado',
        pending: 'Pendiente',
        overdue: 'Vencido',
      },
      layout: 'Diseño',
      pageStructure: 'Estructura de Página',
      design: 'Diseño',
      colorsAndFonts: 'Colores y Fuentes',
      customCode: 'Código Personalizado',
      cssAndJavaScript: 'CSS y JavaScript',
      error: 'Ocurrió un error',
      perMonth: 'por mes',
      getStarted: 'Comenzar',
      allPlansInclude: 'Todos los planes incluyen actualizaciones y soporte básico',
      fromLastMonth: 'desde el mes pasado',
      newThisMonth: 'nuevos este mes',
      outOf: 'de',
      total: 'total',
      perPatient: 'por paciente',
      thisWeek: 'Esta Semana',
      thisMonth: 'Este Mes',
      thisQuarter: 'Este Trimestre',
      thisYear: 'Este Año'
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Administra la configuración y preferencias de tu cuenta',
      account: {
        title: 'Configuración de la Cuenta',
        personalInfo: 'Información Personal',
        passwordSecurity: 'Contraseña y Seguridad',
        notifications: 'Notificaciones'
      },
      appearance: {
        title: 'Apariencia',
        darkMode: 'Modo Oscuro',
        colors: 'Colores',
        typography: {
          title: 'Tipografía',
          baseFont: 'Fuente Base',
          headingFont: 'Fuente de Encabezados'
        },
        borderRadius: {
          title: 'Radio de Borde',
          none: 'Ninguno',
          small: 'Pequeño',
          medium: 'Mediano',
          large: 'Grande',
          extraLarge: 'Extra Grande'
        }
      },
      membership: {
        title: 'Membresía',
        subtitle: 'Administra tu suscripción y facturación',
        mostPopular: 'Más Popular',
        perMonth: 'por mes',
        getStarted: 'Comenzar',
        allPlansInclude: 'Todos los planes incluyen actualizaciones y soporte básico',
        freeTier: {
          name: 'Gratuito',
          trial: '90 días de prueba gratis'
        },
        proTier: {
          name: 'Pro'
        }
      }
    },
    doctors: {
      title: 'Doctores',
      subtitle: 'Gestiona la información de doctores y personal',
      addDoctor: 'Agregar Doctor',
      editDoctor: 'Editar Doctor',
      search: 'Buscar doctores...',
      noResults: 'No se encontraron doctores',
      form: {
        name: 'Nombre del Doctor',
        email: 'Correo Electrónico',
        specialization: 'Especialización',
        phone: 'Número de Teléfono',
        workingHours: 'Horario de Trabajo',
        startTime: 'Hora de Inicio',
        endTime: 'Hora de Fin',
        daysOff: 'Días Libres',
        confirmDelete: '¿Estás seguro de que deseas eliminar este doctor?'
      },
      actions: {
        save: 'Guardar Cambios',
        cancel: 'Cancelar'
      }
    },
    dashboard: {
      title: 'Panel de Control',
      todayAppointments: 'Citas de Hoy',
      viewSchedule: 'Ver Agenda',
      totalPatients: 'Total de Pacientes',
      viewPatients: 'Ver Pacientes',
      activeStaff: 'Personal Activo',
      viewStaff: 'Ver Personal',
      treatments: 'Tratamientos',
      viewTreatments: 'Ver Tratamientos'
    },
    patients: {
      title: 'Pacientes',
      subtitle: 'Gestiona los registros e información de pacientes',
      addNew: 'Agregar Nuevo Paciente',
      search: 'Buscar pacientes...',
      contact: 'Información de Contacto',
      dateOfBirth: 'Fecha de Nacimiento',
      lastVisit: 'Última Visita',
      nextAppointment: 'Próxima Cita',
      noneScheduled: 'Sin Citas Programadas',
      noResults: 'No se encontraron pacientes',
      dentalChart: 'Odontograma',
      periodontogram: 'Periodontograma',
      records: 'Registros del Paciente'
    },
    appointments: {
      title: 'Citas',
      subtitle: 'Gestiona y programa citas de pacientes',
      newAppointment: 'Nueva Cita',
      search: 'Buscar citas...',
      available: 'Disponible',
      noAppointments: 'No se encontraron citas',
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
        dentist: 'Dentista',
        notes: 'Notas',
        notesPlaceholder: 'Agregar notas o instrucciones adicionales',
        createAppointment: 'Crear Cita'
      },
      status: {
        completed: 'Completada',
        scheduled: 'Programada'
      }
    },
    treatments: {
      title: 'Tratamientos',
      subtitle: 'Gestiona tratamientos y procedimientos dentales',
      addNew: 'Agregar Nuevo Tratamiento',
      search: 'Buscar tratamientos...',
      name: 'Nombre del Tratamiento',
      category: 'Categoría',
      duration: 'Duración',
      cost: 'Costo',
      description: 'Descripción',
      recentTreatments: 'Tratamientos Recientes',
      noResults: 'No se encontraron tratamientos',
      allTreatments: 'Todos los Tratamientos',
      createTreatment: 'Crear Tratamiento',
      form: {
        name: 'Nombre del Tratamiento',
        category: 'Categoría',
        duration: 'Duración (minutos)',
        cost: 'Costo ($)',
        description: 'Descripción',
        descriptionPlaceholder: 'Ingrese detalles y notas del tratamiento'
      }
    },
    billing: {
      title: 'Facturación',
      subtitle: 'Gestiona facturas y pagos',
      createInvoice: 'Crear Factura',
      totalRevenue: 'Ingresos Totales',
      pendingPayments: 'Pagos Pendientes',
      overduePayments: 'Pagos Vencidos',
      averagePaymentTime: 'Tiempo Promedio de Pago',
      revenueOverview: 'Resumen de Ingresos',
      treatmentDistribution: 'Distribución de Tratamientos',
      allTreatments: 'Todos los Tratamientos',
      completedTreatments: 'Tratamientos Completados',
      canceledTreatments: 'Tratamientos Cancelados',
      rescheduledTreatments: 'Tratamientos Reprogramados',
      exportReports: 'Exportar Informes',
      statistics: {
        totalRevenue: 'Ingresos Totales',
        totalPatients: 'Total de Pacientes',
        treatments: 'Tratamientos',
        averageVisits: 'Visitas Promedio'
      }
    },
    reports: {
      title: 'Informes',
      subtitle: 'Ver y analizar el rendimiento de la práctica',
      exportReports: 'Exportar Informes',
      revenueOverview: 'Resumen de Ingresos',
      treatmentDistribution: 'Distribución de Tratamientos',
      allTreatments: 'Todos los Tratamientos',
      completedTreatments: 'Tratamientos Completados',
      canceledTreatments: 'Tratamientos Cancelados',
      rescheduledTreatments: 'Tratamientos Reprogramados',
      statistics: {
        totalRevenue: 'Ingresos Totales',
        totalPatients: 'Total de Pacientes',
        treatments: 'Tratamientos',
        averageVisits: 'Visitas Promedio'
      }
    },
    websiteBuilder: {
      title: 'Constructor de Sitios Web',
      subtitle: 'Crea y personaliza el sitio web de tu práctica dental',
      aiGenerator: 'Generador IA',
      generateWebsite: 'Generar Sitio Web',
      previewTemplate: 'Vista Previa',
      selectTemplate: 'Selecciona una plantilla para previsualizar',
      templates: {
        'modern-clinic': {
          name: 'Clínica Moderna',
          description: 'Un diseño limpio y moderno perfecto para clínicas dentales contemporáneas'
        },
        'family-dentistry': {
          name: 'Dentista Familiar',
          description: 'Diseño cálido y acogedor ideal para clínicas dentales familiares'
        },
        'specialist-practice': {
          name: 'Práctica Especializada',
          description: 'Diseño profesional para servicios dentales especializados'
        }
      },
      customTemplate: {
        title: 'Plantilla Personalizada',
        description: 'Comienza desde cero y crea tu propio diseño único'
      },
      preview: {
        title: 'Vista Previa',
        mobile: 'Móvil',
        tablet: 'Tableta',
        desktop: 'Escritorio'
      },
      ai: {
        title: 'Generador de Sitios Web IA',
        description: 'Describe tu sitio web ideal y deja que la IA lo cree por ti',
        placeholder: 'Describe tu práctica dental y las características deseadas del sitio web...',
        generating: 'Generando...',
        error: 'La clave API de OpenAI no está configurada. Por favor, agrégala a tus variables de entorno.'
      }
    }
  }
}