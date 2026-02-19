import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const HeroSection = ({ searchTerm, onSearchChange }) => {
  const { t } = useLanguage();
  return (
    <div className="relative text-white py-16 px-4 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/nature-diver-divers-diving.jpg)',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/70 to-ocean-blue/70"></div>
      </div>
      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('explore.title')}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-ocean-light">
          {t('explore.subtitle')}
        </p>
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('explore.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-ocean-teal shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
