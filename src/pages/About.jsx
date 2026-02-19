import React from 'react';
import { Waves, Target, Heart, Users, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <section className="relative text-white py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/mar.jpg)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/70 via-ocean-blue/60 to-ocean-teal/70"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Waves className="w-20 h-20 mx-auto mb-6 text-ocean-light animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-ocean-light">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="#005f73" fill="none" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-ocean-blue">
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-ocean-blue bg-opacity-10 rounded-full p-4">
                  <Target className="w-12 h-12 text-ocean-blue" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep text-center mb-8">
                {t('about.ourStory')}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong className="text-ocean-blue">World Divers</strong> nace de una necesidad de planificar viajes de buceo con información clara, confiable y alineada con la vida marina.
                </p>
                <p>
                  Durante años, los buzos y viajeros han tenido que buscar datos en múltiples fuentes dispersas para saber cuándo y dónde es posible ver determinadas especies marinas. La falta de información centralizada sobre temporadas, probabilidades de avistamientos y prácticas responsables hace que planificar una experiencia de buceo sea más compleja de lo que debería ser.
                </p>
                <p className="text-xl font-semibold text-ocean-blue">
                  World Divers surge para transformar esa experiencia.
                </p>
                <p>
                  Somos una plataforma digital de buceo y turismo marino que ofrece información organizada sobre temporadas de animales marinos, destinos de buceo y planificación de inmersiones según especies, meses del año y ubicación geográfica. Nuestro objetivo es ayudar a los buzos a optimizar su tiempo y su inversión, aumentando las probabilidades de vivir encuentros marinos memorables y responsables.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-ocean-blue to-ocean-teal rounded-xl p-8 text-white mb-12">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-10 h-10" />
              </div>
              <p className="text-lg leading-relaxed text-center">
                En <strong>World Divers</strong>, creemos que explorar y proteger el océano deben ir de la mano. Promovemos el buceo consciente, el respeto por las temporadas naturales y la conservación de los ecosistemas marinos, impulsando experiencias que generen impacto positivo en las comunidades locales y en la vida submarina.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-ocean-deep to-ocean-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-ocean-light rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-ocean-teal rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('about.pillarsTitle')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="bg-ocean-light rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Globe className="w-8 h-8 text-ocean-deep" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{t('about.pillar1Title')}</h3>
              <p className="text-ocean-light text-center">
                {t('about.pillar1Desc')}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="bg-ocean-light rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-8 h-8 text-ocean-deep" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{t('about.pillar2Title')}</h3>
              <p className="text-ocean-light text-center">
                {t('about.pillar2Desc')}
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
              <div className="bg-ocean-light rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-ocean-deep" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{t('about.pillar3Title')}</h3>
              <p className="text-ocean-light text-center">
                {t('about.pillar3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 border-4 border-ocean-blue rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 border-4 border-ocean-teal rounded-full"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-6">
            {t('about.ctaTitle')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('about.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explorar"
              className="inline-flex items-center justify-center bg-ocean-blue text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-teal transition-colors shadow-lg"
            >
              {t('about.exploreButton')}
            </Link>
            <Link
              to="/membresias"
              className="inline-flex items-center justify-center bg-white text-ocean-blue border-2 border-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-blue hover:text-white transition-colors shadow-lg"
            >
              {t('about.membershipsButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
