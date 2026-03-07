import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import AnimalCard from '../components/AnimalCard';
import DetailModal from '../components/DetailModal';
import { useLanguage } from '../context/LanguageContext';

const Explore = () => {
  const { t } = useLanguage();
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const monthMap = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };

  const transformSpeciesToAnimal = (species) => {
    const transformed = [];
    
    species.occurrences.forEach(occurrence => {
      const monthNumbers = occurrence.months.map(m => monthMap[m]);
      const meses_inicio = Math.min(...monthNumbers);
      const meses_fin = Math.max(...monthNumbers);
      
      transformed.push({
        id: `${species._id}-${occurrence._id}`,
        animal: species.commonName,
        scientificName: species.scientificName,
        destino: occurrence.destination?.name ? `${occurrence.destination.name}, ${occurrence.destination.country}` : 'Destino no especificado',
        meses_inicio: meses_inicio,
        meses_fin: meses_fin,
        months: occurrence.months,
        dificultad: species.difficulty,
        imagen_url: species.imageUrl || 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
        descripcion: species.description,
        category: species.category,
        probability: occurrence.probability,
        seasonLevel: occurrence.seasonLevel,
        logistics: occurrence.logistics,
        environmentalSpecs: species.environmentalSpecs,
        metadata: species.metadata,
        speciesId: species._id
      });
    });
    
    return transformed;
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/species?status=published`);
        
        if (!response.ok) {
          throw new Error('Error al cargar las especies');
        }
        
        const data = await response.json();
        const allAnimals = data.species.flatMap(transformSpeciesToAnimal);
        
        setAnimals(allAnimals);
        setFilteredAnimals(allAnimals);
      } catch (err) {
        console.error('Error fetching species:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
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
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-blue"></div>
            <p className="text-gray-600 mt-4">Cargando especies marinas...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-xl text-red-600">{error}</p>
            <p className="text-gray-500 mt-2">Por favor, intenta recargar la página</p>
          </div>
        ) : filteredAnimals.length === 0 ? (
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
