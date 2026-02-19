import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import AnimalCard from '../components/AnimalCard';
import DetailModal from '../components/DetailModal';
import animalsData from '../data.json';
import { useLanguage } from '../context/LanguageContext';

const Explore = () => {
  const { t } = useLanguage();
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    setAnimals(animalsData);
    setFilteredAnimals(animalsData);
  }, []);

  useEffect(() => {
    let results = [...animals];

    if (searchTerm) {
      results = results.filter(
        (animal) =>
          animal.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          animal.destino.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedMonth !== 0) {
      results = results.filter((animal) => {
        if (animal.meses_inicio <= animal.meses_fin) {
          return selectedMonth >= animal.meses_inicio && selectedMonth <= animal.meses_fin;
        } else {
          return selectedMonth >= animal.meses_inicio || selectedMonth <= animal.meses_fin;
        }
      });
    }

    setFilteredAnimals(results);
  }, [searchTerm, selectedMonth, animals]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-ocean-light to-opacity-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="explore-waves" x="0" y="0" width="150" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 Q 37.5 15, 75 40 T 150 40" stroke="#005f73" fill="none" strokeWidth="1.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#explore-waves)" />
        </svg>
      </div>
      <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterBar selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
      
      <div className="container mx-auto px-4 py-8">
        {filteredAnimals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              {t('explore.noResults')}
            </p>
            <p className="text-gray-500 mt-2">
              {t('explore.noResultsDesc')}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold text-ocean-blue">{filteredAnimals.length}</span> resultado{filteredAnimals.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onClick={() => setSelectedAnimal(animal)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {selectedAnimal && (
        <DetailModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
        />
      )}
    </div>
  );
};

export default Explore;
