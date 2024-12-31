export const esMX = {
  common: {
    loading: 'Cargando...',
    retry: 'Reintentar',
    error: 'Error',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    download: 'Descargar',
    comingSoon: 'Próximamente',
    pageNotFound: 'Página no encontrada',
    returnHome: 'Volver al inicio',
    menu: 'Menú',
    search: 'Buscar',
    theme: {
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
      toggle: 'Cambiar tema'
    }
  },

  navigation: {
    dashboard: 'Panel Principal',
    courses: 'Cursos',
    certifications: 'Certificaciones',
    bookings: 'Reservas',
    community: 'Comunidad',
    achievements: 'Logros'
  },

  dashboard: {
    welcome: '¡Bienvenido de nuevo, {name}!',
    overview: 'Aquí está el resumen de tu progreso y actividades próximas',
    stats: {
      completedCourses: 'Cursos Completados',
      totalPlayTime: 'Tiempo Total de Juego',
      skillLevel: 'Nivel de Habilidad',
      remainingChallenges: 'Desafíos Pendientes'
    },
    actions: {
      bookCourt: 'Reservar Pista',
      resumeCourse: 'Continuar Curso',
      resumingCourse: 'Cargando tu último curso...'
    },
    error: {
      description: 'No se pudo cargar la información del panel. Por favor intenta de nuevo.'
    }
  },

  courses: {
    title: 'Cursos Disponibles',
    description: 'Mejora tus habilidades con nuestros cursos especializados',
    noResults: 'No se encontraron cursos',
    levels: {
      all: 'Todos los Niveles',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado'
    },
    filters: {
      sortBy: 'Ordenar por',
      newest: 'Más Recientes',
      popular: 'Más Populares',
      rating: 'Mejor Valorados'
    },
    card: {
      duration: '{duration} minutos',
      instructor: 'Instructor: {name}',
      startLearning: 'Comenzar Curso'
    },
    enrollment: {
      title: 'Inscripción al Curso',
      description: '¿Deseas inscribirte en {course}?',
      includes: 'El curso incluye:',
      features: {
        videos: 'Videos de entrenamiento',
        exercises: 'Ejercicios prácticos',
        certificate: 'Certificado al completar',
        support: 'Soporte del instructor'
      },
      confirm: 'Confirmar Inscripción',
      processing: 'Procesando inscripción...'
    }
  },

  certifications: {
    title: 'Tus Certificaciones',
    description: 'Gestiona y descarga tus certificaciones profesionales',
    downloadAll: 'Descargar Todo',
    noCertifications: 'No hay certificaciones disponibles',
    filters: {
      status: 'Estado',
      all: 'Todos',
      active: 'Activos',
      pending: 'Pendientes',
      expired: 'Expirados'
    },
    status: {
      active: 'Activo',
      pending: 'Pendiente',
      expired: 'Expirado'
    },
    issuedOn: 'Emitido el {date}',
    expiresOn: 'Expira el {date}',
    verify: 'Verificar',
    error: {
      title: 'Error al cargar certificaciones',
      description: 'No se pudieron cargar tus certificaciones. Por favor intenta de nuevo.',
      load: 'Error al cargar las certificaciones',
      download: 'Error al descargar la certificación'
    },
    success: {
      download: 'Certificación descargada exitosamente'
    }
  },

  bookings: {
    title: 'Reservas de Pista',
    description: 'Reserva y gestiona tus horarios de juego',
    noHistory: 'No hay reservas previas',
    tabs: {
      book: 'Reservar',
      history: 'Historial'
    },
    form: {
      court: 'Pista',
      time: 'Horario',
      selectCourt: 'Seleccionar pista',
      selectTime: 'Seleccionar horario',
      submit: 'Confirmar Reserva',
      processing: 'Procesando reserva...'
    },
    court: 'Pista {number}',
    timeSlots: 'Horarios Disponibles',
    noAvailability: 'No disponible',
    error: {
      title: 'Error en las reservas',
      description: 'No se pudieron cargar las reservas. Por favor intenta de nuevo.',
      incomplete: 'Por favor completa todos los campos',
      load: 'Error al cargar las reservas',
      book: 'Error al procesar la reserva'
    },
    success: {
      book: 'Reserva confirmada exitosamente'
    }
  },

  dates: {
    today: 'Hoy',
    tomorrow: 'Mañana',
    yesterday: 'Ayer',
    justNow: 'Ahora mismo',
    minutesAgo: 'hace {minutes} minutos',
    hoursAgo: 'hace {hours} horas',
    timeAgo: 'hace {time}'
  }
};