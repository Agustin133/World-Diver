import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-gradient-to-r from-ocean-deep to-ocean-blue text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Descubre la Vida Marina del Mundo
        </h1>
        <p className="text-lg md:text-xl mb-8 text-ocean-light">
          Planifica tus viajes de buceo según la temporada de cada especie
        </p>
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Busca por animal o destino..."
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
