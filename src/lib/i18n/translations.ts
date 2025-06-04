export const translations = {
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
        notesPlaceholder: 'Add any notes about the appointment...',
        createAppointment: 'Create Appointment'
      },
      status: {
        scheduled: 'Scheduled',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
    },
    patients: {
      title: 'Patients',
      subtitle: 'Manage patient records and information',
      addNew: 'Add Patient',
      search: 'Search patients...',
      contact: 'Contact',
      dateOfBirth: 'Date of Birth',
      lastVisit: 'Last Visit',
      nextAppointment: 'Next Appointment',
      noneScheduled: 'None Scheduled',
      dentalChart: 'Dental Chart',
      periodontogram: 'Periodontogram',
      records: 'Records',
      noResults: 'No patients found'
    },
    treatments: {
      title: 'Treatments',
      subtitle: 'Manage dental treatments and procedures',
      addNew: 'Add Treatment',
      search: 'Search treatments...',
      name: 'Treatment Name',
      category: 'Category',
      duration: 'minutes',
      cost: 'Cost',
      description: 'Description',
      recentTreatments: 'Recent Treatments'
    },
    doctors: {
      title: 'Doctors',
      subtitle: 'Manage dental staff and schedules',
      addDoctor: 'Add Doctor',
      editDoctor: 'Edit Doctor',
      search: 'Search doctors...',
      noResults: 'No doctors found',
      form: {
        name: 'Full Name',
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
    reports: {
      title: 'Reports',
      subtitle: 'View analytics and generate reports',
      exportReports: 'Export Reports',
      statistics: {
        totalRevenue: 'Total Revenue',
        totalPatients: 'Total Patients',
        treatments: 'Treatments',
        averageVisits: 'Average Visits'
      },
      revenueOverview: 'Revenue Overview',
      treatmentDistribution: 'Treatment Distribution',
      allTreatments: 'All Treatments',
      completedTreatments: 'Completed Treatments',
      canceledTreatments: 'Canceled Treatments',
      rescheduledTreatments: 'Rescheduled Treatments'
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage your account and preferences',
      account: {
        title: 'Account',
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
      }
    },
    websiteBuilder: {
      title: 'Website Builder',
      subtitle: 'Create and customize your dental practice website',
      aiGenerator: 'AI Generator',
      generateWebsite: 'Generate Website',
      previewTemplate: 'Preview Template',
      selectTemplate: 'Select a template to preview',
      customTemplate: {
        title: 'Custom Template',
        description: 'Start from scratch with a blank template'
      },
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
    },
    billing: {
      title: 'Billing',
      subtitle: 'Manage invoices and payments',
      createInvoice: 'Create Invoice',
      totalRevenue: 'Total Revenue',
      pendingPayments: 'Pending Payments',
      overduePayments: 'Overdue Payments',
      averagePaymentTime: 'Average Payment Time',
      search: 'Search invoices...',
      noResults: 'No invoices found'
    },
    dentalChart: {
      title: 'Dental Chart',
      patient: 'Patient',
      patientId: 'ID',
      treatmentTypes: 'Treatment Types',
      patientInformation: 'Patient Information',
      lastUpdated: 'Last Updated',
      nextAppointment: 'Next Appointment',
      scheduleAppointment: 'Schedule Appointment',
      treatmentPlan: 'Treatment Plan',
      createTreatmentPlan: 'Create Treatment Plan',
      history: 'History',
      print: 'Print',
      saveChanges: 'Save Changes',
      treatments: {
        caries: 'Caries',
        filling: 'Filling',
        crown: 'Crown',
        extraction: 'Extraction',
        rootcanal: 'Root Canal',
        implant: 'Implant',
        bridge: 'Bridge'
      },
      schedule: {
        title: 'Schedule Appointment',
        date: 'Date',
        time: 'Time',
        selectTime: 'Select a time',
        doctor: 'Doctor',
        selectDoctor: 'Select a doctor',
        cancel: 'Cancel',
        schedule: 'Schedule'
      },
      treatmentPlanModal: {
        title: 'Create Treatment Plan',
        toothNumber: 'Tooth #',
        toothPlaceholder: 'e.g., 18',
        treatment: 'Treatment',
        cost: 'Cost ($)',
        priority: 'Priority',
        notes: 'Notes',
        notesPlaceholder: 'Add any additional notes...',
        addTreatment: 'Add Treatment',
        treatmentItems: 'Treatment Items',
        noTreatments: 'No treatments added yet',
        totalCost: 'Total Cost',
        save: 'Save Treatment Plan',
        priorities: {
          high: 'High',
          medium: 'Medium',
          low: 'Low'
        }
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
      upcoming: 'Próximos',
      completed: 'Completado',
      registered: 'Registrado',
      completedToday: 'Completados Hoy',
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
    dashboard: {
      title: 'Panel Principal',
      todayAppointments: 'Citas de Hoy',
      viewSchedule: 'Ver Agenda',
      totalPatients: 'Total de Pacientes',
      viewPatients: 'Ver Pacientes',
      activeStaff: 'Personal Activo',
      viewStaff: 'Ver Personal',
      treatments: 'Tratamientos',
      viewTreatments: 'Ver Tratamientos'
    },
    appointments: {
      title: 'Citas',
      subtitle: 'Gestionar y programar citas de pacientes',
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
        notesPlaceholder: 'Agregar notas sobre la cita...',
        createAppointment: 'Crear Cita'
      },
      status: {
        scheduled: 'Programada',
        completed: 'Completada',
        cancelled: 'Cancelada'
      }
    },
    patients: {
      title: 'Pacientes',
      subtitle: 'Gestionar registros e información de pacientes',
      addNew: 'Agregar Paciente',
      search: 'Buscar pacientes...',
      contact: 'Contacto',
      dateOfBirth: 'Fecha de Nacimiento',
      lastVisit: 'Última Visita',
      nextAppointment: 'Próxima Cita',
      noneScheduled: 'Sin Programar',
      dentalChart: 'Odontograma',
      periodontogram: 'Periodontograma',
      records: 'Registros',
      noResults: 'No se encontraron pacientes'
    },
    treatments: {
      title: 'Tratamientos',
      subtitle: 'Gestionar tratamientos y procedimientos dentales',
      addNew: 'Agregar Tratamiento',
      search: 'Buscar tratamientos...',
      name: 'Nombre del Tratamiento',
      category: 'Categoría',
      duration: 'minutos',
      cost: 'Costo',
      description: 'Descripción',
      recentTreatments: 'Tratamientos Recientes'
    },
    doctors: {
      title: 'Doctores',
      subtitle: 'Gestionar personal dental y horarios',
      addDoctor: 'Agregar Doctor',
      editDoctor: 'Editar Doctor',
      search: 'Buscar doctores...',
      noResults: 'No se encontraron doctores',
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        specialization: 'Especialización',
        phone: 'Número de Teléfono',
        workingHours: 'Horario Laboral',
        startTime: 'Hora de Inicio',
        endTime: 'Hora de Fin',
        daysOff: 'Días Libres',
        confirmDelete: '¿Está seguro de que desea eliminar este doctor?'
      },
      actions: {
        save: 'Guardar Cambios',
        cancel: 'Cancelar'
      }
    },
    reports: {
      title: 'Reportes',
      subtitle: 'Ver análisis y generar reportes',
      exportReports: 'Exportar Reportes',
      statistics: {
        totalRevenue: 'Ingresos Totales',
        totalPatients: 'Total de Pacientes',
        treatments: 'Tratamientos',
        averageVisits: 'Visitas Promedio'
      },
      revenueOverview: 'Resumen de Ingresos',
      treatmentDistribution: 'Distribución de Tratamientos',
      allTreatments: 'Todos los Tratamientos',
      completedTreatments: 'Tratamientos Completados',
      canceledTreatments: 'Tratamientos Cancelados',
      rescheduledTreatments: 'Tratamientos Reprogramados'
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Administrar cuenta y preferencias',
      account: {
        title: 'Cuenta',
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
          headingFont: 'Fuente de Títulos'
        },
        borderRadius: {
          title: 'Radio de Borde',
          none: 'Ninguno',
          small: 'Pequeño',
          medium: 'Medio',
          large: 'Grande',
          extraLarge: 'Extra Grande'
        }
      }
    },
    websiteBuilder: {
      title: 'Constructor de Sitios Web',
      subtitle: 'Crear y personalizar el sitio web de tu práctica dental',
      aiGenerator: 'Generador IA',
      generateWebsite: 'Generar Sitio Web',
      previewTemplate: 'Vista Previa',
      selectTemplate: 'Selecciona una plantilla para previsualizar',
      customTemplate: {
        title: 'Plantilla Personalizada',
        description: 'Comenzar desde cero con una plantilla en blanco'
      },
      templates: {
        'modern-clinic': {
          name: 'Clínica Moderna',
          description: 'Un diseño limpio y moderno perfecto para clínicas dentales contemporáneas'
        },
        'family-dentistry': {
          name: 'Dentista Familiar',
          description: 'Diseño cálido y acogedor ideal para prácticas dentales familiares'
        },
        'specialist-practice': {
          name: 'Práctica Especializada',
          description: 'Diseño profesional para servicios dentales especializados'
        }
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
    },
    billing: {
      title: 'Facturación',
      subtitle: 'Gestionar facturas y pagos',
      createInvoice: 'Crear Factura',
      totalRevenue: 'Ingresos Totales',
      pendingPayments: 'Pagos Pendientes',
      overduePayments: 'Pagos Vencidos',
      averagePaymentTime: 'Tiempo Promedio de Pago',
      search: 'Buscar facturas...',
      noResults: 'No se encontraron facturas'
    },
    dentalChart: {
      title: 'Odontograma',
      patient: 'Paciente',
      patientId: 'ID',
      treatmentTypes: 'Tipos de Tratamiento',
      patientInformation: 'Información del Paciente',
      lastUpdated: 'Última Actualización',
      nextAppointment: 'Próxima Cita',
      scheduleAppointment: 'Programar Cita',
      treatmentPlan: 'Plan de Tratamiento',
      createTreatmentPlan: 'Crear Plan de Tratamiento',
      history: 'Historial',
      print: 'Imprimir',
      saveChanges: 'Guardar Cambios',
      treatments: {
        caries: 'Caries',
        filling: 'Empaste',
        crown: 'Corona',
        extraction: 'Extracción',
        rootcanal: 'Endodoncia',
        implant: 'Implante',
        bridge: 'Puente'
      },
      schedule: {
        title: 'Programar Cita',
        date: 'Fecha',
        time: 'Hora',
        selectTime: 'Seleccionar hora',
        doctor: 'Doctor',
        selectDoctor: 'Seleccionar doctor',
        cancel: 'Cancelar',
        schedule: 'Programar'
      },
      treatmentPlanModal: {
        title: 'Crear Plan de Tratamiento',
        toothNumber: 'Diente #',
        toothPlaceholder: 'ej., 18',
        treatment: 'Tratamiento',
        cost: 'Costo ($)',
        priority: 'Prioridad',
        notes: 'Notas',
        notesPlaceholder: 'Agregar notas adicionales...',
        addTreatment: 'Agregar Tratamiento',
        treatmentItems: 'Tratamientos',
        noTreatments: 'No hay tratamientos agregados',
        totalCost: 'Costo Total',
        save: 'Guardar Plan de Tratamiento',
        priorities: {
          high: 'Alta',
          medium: 'Media',
          low: 'Baja'
        }
      }
    }
  }
};