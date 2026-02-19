import React from 'react';
import { Heart, ExternalLink, Waves, Fish, Shield, Globe, Anchor, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Conservation = () => {
  const { t } = useLanguage();
  const organizations = [
    {
      name: 'Ocean Conservancy',
      description: 'Organización líder en la protección de océanos, enfocada en soluciones basadas en ciencia para un océano saludable.',
      website: 'https://oceanconservancy.org',
      focus: ['Limpieza de océanos', 'Políticas marinas', 'Vida silvestre'],
      icon: Waves,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Sea Shepherd Conservation Society',
      description: 'Protección directa de la vida marina mediante campañas de acción directa contra la caza ilegal y la pesca destructiva.',
      website: 'https://seashepherd.org',
      focus: ['Protección activa', 'Anti-caza ilegal', 'Conservación'],
      icon: Shield,
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'Coral Reef Alliance',
      description: 'Dedicados a salvar los arrecifes de coral del mundo mediante innovación, colaboración y acción.',
      website: 'https://coral.org',
      focus: ['Arrecifes de coral', 'Restauración', 'Educación'],
      icon: Fish,
      color: 'from-orange-400 to-pink-500'
    },
    {
      name: 'The Ocean Cleanup',
      description: 'Desarrollando tecnologías avanzadas para eliminar el plástico de los océanos y prevenir su entrada.',
      website: 'https://theoceancleanup.com',
      focus: ['Limpieza de plásticos', 'Tecnología', 'Innovación'],
      icon: Globe,
      color: 'from-teal-500 to-green-500'
    },
    {
      name: 'Marine Conservation Institute',
      description: 'Trabajando para identificar importantes ecosistemas oceánicos y asegurar su protección permanente.',
      website: 'https://marine-conservation.org',
      focus: ['Áreas protegidas', 'Investigación', 'Políticas'],
      icon: Anchor,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      name: 'Oceana',
      description: 'La organización internacional más grande enfocada exclusivamente en la conservación de los océanos.',
      website: 'https://oceana.org',
      focus: ['Biodiversidad', 'Pesca sostenible', 'Hábitats marinos'],
      icon: Leaf,
      color: 'from-green-600 to-teal-600'
    }
  ];

  const impactStats = [
    { number: '71%', label: 'Del planeta es océano' },
    { number: '50%', label: 'Del oxígeno proviene del océano' },
    { number: '3B+', label: 'Personas dependen del océano' },
    { number: '8M', label: 'Toneladas de plástico al año' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="relative text-white py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/ballena.jpg)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 via-ocean-blue/70 to-ocean-teal/70"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <Heart className="w-20 h-20 mx-auto mb-6 text-red-300 animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('conservation.title')}
          </h1>
          <p className="text-2xl text-ocean-light max-w-3xl mx-auto mb-8">
            {t('conservation.subtitle')}
          </p>
          <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
            <p className="text-lg font-semibold">
              {t('conservation.message')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-ocean-light to-ocean-blue rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-lg">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">{stat.number}</div>
                <p className="text-xs md:text-sm lg:text-base opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-3 md:mb-4">
              Organizaciones de Conservación
            </h2>
            <div className="w-20 md:w-24 h-1 bg-ocean-blue mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Estas organizaciones están haciendo un trabajo increíble para proteger nuestros océanos. 
              Tu apoyo puede marcar la diferencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {organizations.map((org, index) => {
              const IconComponent = org.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`bg-gradient-to-r ${org.color} p-4 md:p-6 text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 -translate-y-4">
                      <IconComponent className="w-24 md:w-32 h-24 md:h-32" />
                    </div>
                    <IconComponent className="w-10 md:w-12 h-10 md:h-12 mb-2 md:mb-3 relative z-10" />
                    <h3 className="text-xl md:text-2xl font-bold relative z-10">{org.name}</h3>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
                      {org.description}
                    </p>
                    
                    <div className="mb-4 md:mb-6">
                      <p className="text-xs md:text-sm font-semibold text-ocean-blue mb-2">Áreas de enfoque:</p>
                      <div className="flex flex-wrap gap-2">
                        {org.focus.map((area, idx) => (
                          <span
                            key={idx}
                            className="bg-ocean-light bg-opacity-20 text-ocean-deep px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-ocean-blue text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-ocean-teal transition-colors group-hover:scale-105 transform duration-200 text-sm md:text-base"
                    >
                      Visitar y Donar
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-ocean-deep to-ocean-blue text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Por qué es importante la conservación marina?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Waves className="w-10 h-10 mb-4 text-ocean-light" />
              <h3 className="text-xl font-bold mb-3">Regulación del Clima</h3>
              <p className="text-ocean-light">
                Los océanos absorben el 30% del CO2 producido por humanos y regulan el clima global.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Fish className="w-10 h-10 mb-4 text-ocean-light" />
              <h3 className="text-xl font-bold mb-3">Biodiversidad</h3>
              <p className="text-ocean-light">
                Más de 200,000 especies marinas identificadas, con millones aún por descubrir.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Heart className="w-10 h-10 mb-4 text-ocean-light" />
              <h3 className="text-xl font-bold mb-3">Sustento Humano</h3>
              <p className="text-ocean-light">
                3 mil millones de personas dependen del océano como fuente principal de proteínas.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <Globe className="w-10 h-10 mb-4 text-ocean-light" />
              <h3 className="text-xl font-bold mb-3">Economía Global</h3>
              <p className="text-ocean-light">
                La economía oceánica genera más de $2.5 trillones anuales en valor económico.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-ocean-deep mb-6">
            Cómo puedes ayudar
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <div className="bg-ocean-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Dona a organizaciones</h3>
                  <p className="text-gray-600">Apoya financieramente a las organizaciones listadas arriba.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-ocean-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Reduce el plástico</h3>
                  <p className="text-gray-600">Elimina plásticos de un solo uso en tu vida diaria.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-ocean-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Educa y comparte</h3>
                  <p className="text-gray-600">Difunde información sobre la importancia de los océanos.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-ocean-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Consume responsable</h3>
                  <p className="text-gray-600">Elige productos del mar sostenibles y certificados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">
            Juntos por un océano más saludable
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Cada acción cuenta. El futuro de nuestros océanos está en nuestras manos.
          </p>
          <div className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full font-bold text-lg">
            🌊 Actúa hoy, protege el mañana 🌊
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conservation;
