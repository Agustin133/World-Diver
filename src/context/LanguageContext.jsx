import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    // Navbar
    nav: {
      home: 'Home',
      explore: 'Explorar',
      top5: 'Top 5',
      services: 'Servicios',
      world: 'Mundo',
      conservation: 'Conservación',
      about: 'Acerca de',
      login: 'Ingresar',
      signup: 'Registrarse',
      logout: 'Cerrar Sesión',
      memberships: 'Membresías',
      currentPlan: 'Plan actual'
    },
    // Home
    home: {
      title: 'World Divers',
      subtitle: 'Descubre cuándo y dónde encontrar la vida marina más fascinante del planeta',
      exploreButton: 'Explorar Destinos',
      whyImportantTitle: '¿Por qué es importante la vida marina?',
      section1Title: 'Equilibrio Ecológico',
      section1Desc: 'Los océanos producen más del 50% del oxígeno que respiramos y absorben grandes cantidades de CO2, regulando el clima global.',
      section2Title: 'Biodiversidad Única',
      section2Desc: 'Los océanos albergan el 80% de la vida en la Tierra. Cada especie juega un papel crucial en el ecosistema marino.',
      section3Title: 'Sustento Humano',
      section3Desc: 'Más de 3 mil millones de personas dependen del océano como fuente principal de proteínas y sustento económico.',
      missionTitle: 'Nuestra Misión',
      missionText1: 'En Marine Season Tracker, creemos que conocer es proteger. Nuestra plataforma conecta a buceadores y amantes del océano con las mejores oportunidades para observar vida marina de manera responsable.',
      missionText2: 'Al planificar viajes basados en las temporadas naturales de migración y reproducción, promovemos el turismo sostenible que respeta los ciclos de vida de las especies marinas y contribuye a su conservación.',
      ctaTitle: '¿Listo para tu próxima aventura submarina?',
      ctaSubtitle: 'Únete a miles de buceadores que ya planifican sus viajes con World Divers',
      ctaButton1: 'Conoce Nuestra Historia',
      ctaButton2: 'Ver Membresías'
    },
    // Explore
    explore: {
      title: 'Explora el Mundo Submarino',
      subtitle: 'Descubre los mejores destinos de buceo y la vida marina que puedes encontrar',
      searchPlaceholder: 'Buscar por destino o animal marino...',
      filters: 'Filtros',
      allRegions: 'Todas las Regiones',
      allMonths: 'Todos los Meses',
      clearFilters: 'Limpiar Filtros',
      noResults: 'No se encontraron resultados',
      noResultsDesc: 'Intenta ajustar tus filtros o búsqueda',
      bestSeason: 'Mejor época',
      marineLife: 'Vida Marina',
      learnMore: 'Conocer Más'
    },
    // Services
    services: {
      title: 'Servicios World Divers',
      subtitle: 'Descubre destinos increíbles y aprovecha nuestras promociones exclusivas',
      destinations: 'Destinos',
      promotions: 'Promociones',
      featuredDestinations: 'Destinos Destacados',
      featuredDesc: 'Los mejores lugares del mundo para experiencias de buceo inolvidables',
      marineLifeHighlights: 'Vida Marina Destacada:',
      viewDetails: 'Ver Más Detalles',
      aboutDestination: 'Sobre este destino',
      close: 'Cerrar',
      bookTrip: 'Reservar Viaje',
      bestTime: 'Mejor época',
      ctaTitle: '¿Listo para tu próxima aventura submarina?',
      ctaSubtitle: 'Únete a miles de buceadores que ya planifican sus viajes con Marine Season Tracker',
      ctaButton: 'Comenzar Ahora'
    },
    // World
    world: {
      title: 'Mapa Mundial de Buceo',
      subtitle: 'Explora destinos de buceo en todo el mundo',
      description: 'Haz clic en los marcadores para descubrir información detallada sobre cada destino',
      viewInDestinations: 'Ver en Destinos'
    },
    // Conservation
    conservation: {
      title: 'Conservación Marina',
      subtitle: 'Juntos podemos proteger y preservar nuestros océanos para las futuras generaciones',
      message: 'Cada donación cuenta. Cada acción importa. 🌊',
      stat1: 'Del planeta es océano',
      stat2: 'Del oxígeno proviene del océano',
      stat3: 'Personas dependen del océano',
      stat4: 'Toneladas de plástico al año',
      organizationsTitle: 'Organizaciones de Conservación Marina',
      organizationsSubtitle: 'Apoya a estas increíbles organizaciones que trabajan para proteger nuestros océanos',
      visit: 'Visitar Sitio Web',
      focus: 'Áreas de Enfoque'
    },
    // About
    about: {
      title: 'Acerca de World Divers',
      subtitle: 'Transformando la forma en que los buzos planifican sus aventuras submarinas',
      ourStory: 'Nuestra Historia',
      pillarsTitle: 'Nuestros Pilares',
      pillar1Title: 'Información Centralizada',
      pillar1Desc: 'Toda la información que necesitas en un solo lugar: temporadas, destinos, especies y mejores prácticas de buceo responsable.',
      pillar2Title: 'Conservación Marina',
      pillar2Desc: 'Promovemos el respeto por las temporadas naturales y la protección de ecosistemas marinos para futuras generaciones.',
      pillar3Title: 'Comunidad Global',
      pillar3Desc: 'Conectamos buzos de todo el mundo con experiencias auténticas que benefician a las comunidades locales.',
      ctaTitle: 'Únete a la Revolución del Buceo Responsable',
      ctaSubtitle: 'Forma parte de una comunidad que valora tanto la aventura como la conservación',
      exploreButton: 'Explorar Destinos',
      membershipsButton: 'Ver Membresías'
    },
    // Common
    common: {
      rating: 'Calificación',
      country: 'País',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito'
    }
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      explore: 'Explore',
      top5: 'Top 5',
      services: 'Services',
      world: 'World',
      conservation: 'Conservation',
      about: 'About',
      login: 'Login',
      signup: 'Sign Up',
      logout: 'Logout',
      memberships: 'Memberships',
      currentPlan: 'Current plan'
    },
    // Home
    home: {
      title: 'World Divers',
      subtitle: 'Discover when and where to find the most fascinating marine life on the planet',
      exploreButton: 'Explore Destinations',
      whyImportantTitle: 'Why is marine life important?',
      section1Title: 'Ecological Balance',
      section1Desc: 'Oceans produce more than 50% of the oxygen we breathe and absorb large amounts of CO2, regulating the global climate.',
      section2Title: 'Unique Biodiversity',
      section2Desc: 'Oceans harbor 80% of life on Earth. Each species plays a crucial role in the marine ecosystem.',
      section3Title: 'Human Sustenance',
      section3Desc: 'More than 3 billion people depend on the ocean as their main source of protein and economic livelihood.',
      missionTitle: 'Our Mission',
      missionText1: 'At Marine Season Tracker, we believe that knowing is protecting. Our platform connects divers and ocean lovers with the best opportunities to observe marine life responsibly.',
      missionText2: 'By planning trips based on natural migration and reproduction seasons, we promote sustainable tourism that respects the life cycles of marine species and contributes to their conservation.',
      ctaTitle: 'Ready for your next underwater adventure?',
      ctaSubtitle: 'Join thousands of divers who already plan their trips with World Divers',
      ctaButton1: 'Learn Our Story',
      ctaButton2: 'View Memberships'
    },
    // Explore
    explore: {
      title: 'Explore the Underwater World',
      subtitle: 'Discover the best diving destinations and marine life you can find',
      searchPlaceholder: 'Search by destination or marine animal...',
      filters: 'Filters',
      allRegions: 'All Regions',
      allMonths: 'All Months',
      clearFilters: 'Clear Filters',
      noResults: 'No results found',
      noResultsDesc: 'Try adjusting your filters or search',
      bestSeason: 'Best season',
      marineLife: 'Marine Life',
      learnMore: 'Learn More'
    },
    // Services
    services: {
      title: 'World Divers Services',
      subtitle: 'Discover incredible destinations and take advantage of our exclusive promotions',
      destinations: 'Destinations',
      promotions: 'Promotions',
      featuredDestinations: 'Featured Destinations',
      featuredDesc: 'The best places in the world for unforgettable diving experiences',
      marineLifeHighlights: 'Marine Life Highlights:',
      viewDetails: 'View Details',
      aboutDestination: 'About this destination',
      close: 'Close',
      bookTrip: 'Book Trip',
      bestTime: 'Best time',
      ctaTitle: 'Ready for your next underwater adventure?',
      ctaSubtitle: 'Join thousands of divers who already plan their trips with Marine Season Tracker',
      ctaButton: 'Get Started'
    },
    // World
    world: {
      title: 'World Diving Map',
      subtitle: 'Explore diving destinations around the world',
      description: 'Click on the markers to discover detailed information about each destination',
      viewInDestinations: 'View in Destinations'
    },
    // Conservation
    conservation: {
      title: 'Marine Conservation',
      subtitle: 'Together we can protect and preserve our oceans for future generations',
      message: 'Every donation counts. Every action matters. 🌊',
      stat1: 'Of the planet is ocean',
      stat2: 'Of oxygen comes from the ocean',
      stat3: 'People depend on the ocean',
      stat4: 'Tons of plastic per year',
      organizationsTitle: 'Marine Conservation Organizations',
      organizationsSubtitle: 'Support these amazing organizations working to protect our oceans',
      visit: 'Visit Website',
      focus: 'Focus Areas'
    },
    // About
    about: {
      title: 'About World Divers',
      subtitle: 'Transforming the way divers plan their underwater adventures',
      ourStory: 'Our Story',
      pillarsTitle: 'Our Pillars',
      pillar1Title: 'Centralized Information',
      pillar1Desc: 'All the information you need in one place: seasons, destinations, species and best responsible diving practices.',
      pillar2Title: 'Marine Conservation',
      pillar2Desc: 'We promote respect for natural seasons and the protection of marine ecosystems for future generations.',
      pillar3Title: 'Global Community',
      pillar3Desc: 'We connect divers from around the world with authentic experiences that benefit local communities.',
      ctaTitle: 'Join the Responsible Diving Revolution',
      ctaSubtitle: 'Be part of a community that values both adventure and conservation',
      exploreButton: 'Explore Destinations',
      membershipsButton: 'View Memberships'
    },
    // Common
    common: {
      rating: 'Rating',
      country: 'Country',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
