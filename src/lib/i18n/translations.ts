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
        doctor: 'Doctor',
        notes: 'Notes',
        addNotes: 'Add any additional notes...',
        createAppointment: 'Create Appointment'
      }
    },
    // ... rest of English translations
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
        doctor: 'Doctor',
        notes: 'Notas',
        addNotes: 'Agregar notas adicionales...',
        createAppointment: 'Crear Cita'
      }
    },
    // ... rest of Spanish translations
  }
};