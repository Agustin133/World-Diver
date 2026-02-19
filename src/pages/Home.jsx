import React from 'react';
import { Waves, Heart, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <section className="relative text-white py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/turtle-background.jpg)',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-deep/60 via-ocean-blue/50 to-ocean-teal/60"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              World Divers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-ocean-light">
              {t('home.subtitle')}
            </p>
            <Link
              to="/explorar"
              className="inline-flex items-center bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-light hover:text-white transition-all shadow-lg"
            >
              {t('home.exploreButton')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white via-blue-50 to-ocean-light to-opacity-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="ocean-waves" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 50 20, 100 50 T 200 50" stroke="#005f73" fill="none" strokeWidth="2"/>
              <path d="M0 60 Q 50 30, 100 60 T 200 60" stroke="#0a9396" fill="none" strokeWidth="1.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#ocean-waves)" />
          </svg>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-4">
              {t('home.whyImportantTitle')}
            </h2>
            <div className="w-24 h-1 bg-ocean-blue mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                {t('home.section1Title')}
              </h3>
              <p className="text-gray-600">
                {t('home.section1Desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                {t('home.section2Title')}
              </h3>
              <p className="text-gray-600">
                {t('home.section2Desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                {t('home.section3Title')}
              </h3>
              <p className="text-gray-600">
                {t('home.section3Desc')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-ocean-blue to-ocean-teal rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">{t('home.missionTitle')}</h3>
              <p className="text-lg mb-4 leading-relaxed">
                {t('home.missionText1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('home.missionText2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-ocean-deep via-ocean-blue to-ocean-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-ocean-light rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-ocean-light mb-8">
            {t('home.ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/acerca-de"
              className="inline-flex items-center justify-center bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-light hover:text-white transition-colors shadow-lg"
            >
              {t('home.ctaButton1')}
            </Link>
            <Link
              to="/membresias"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-ocean-blue transition-colors shadow-lg"
            >
              {t('home.ctaButton2')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
