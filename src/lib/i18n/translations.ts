import { Translations } from './types';

export const translations: Translations = {
  en: {
    common: {
      // ... existing common translations
    },
    doctors: {
      title: 'Doctors',
      subtitle: 'Manage doctors and their schedules',
      addDoctor: 'Add Doctor',
      editDoctor: 'Edit Doctor',
      search: 'Search doctors...',
      noResults: 'No doctors found. Try a different search term.',
      form: {
        name: 'Name',
        email: 'Email',
        specialization: 'Specialization',
        phone: 'Phone',
        workingHours: 'Working Hours',
        startTime: 'Start Time',
        endTime: 'End Time',
        daysOff: 'Days Off',
        confirmDelete: 'Are you sure you want to delete this doctor?'
      },
      actions: {
        save: 'Save Changes',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete'
      }
    },
    // ... rest of the English translations
  },
  es: {
    common: {
      // ... existing common translations
    },
    doctors: {
      title: 'Doctores',
      subtitle: 'Gestionar doctores y sus horarios',
      addDoctor: 'Agregar Doctor',
      editDoctor: 'Editar Doctor',
      search: 'Buscar doctores...',
      noResults: 'No se encontraron doctores. Intente con otros términos de búsqueda.',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        specialization: 'Especialización',
        phone: 'Teléfono',
        workingHours: 'Horario de Trabajo',
        startTime: 'Hora de Inicio',
        endTime: 'Hora de Fin',
        daysOff: 'Días Libres',
        confirmDelete: '¿Está seguro que desea eliminar este doctor?'
      },
      actions: {
        save: 'Guardar Cambios',
        cancel: 'Cancelar',
        edit: 'Editar',
        delete: 'Eliminar'
      }
    },
    // ... rest of the Spanish translations
  }
};