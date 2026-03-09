import React, { useMemo } from 'react';
import { Fish } from 'lucide-react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AnimalFilter = ({ animals, selectedLetter, onLetterChange }) => {
  // Obtener letras disponibles basadas en los animales
  const availableLetters = useMemo(() => {
    const letters = new Set();
    animals.forEach(animal => {
      if (animal.animal) {
        const firstLetter = animal.animal.charAt(0).toUpperCase();
        if (alphabet.includes(firstLetter)) {
          letters.add(firstLetter);
        }
      }
    });
    return letters;
  }, [animals]);

  // Obtener animales únicos ordenados alfabéticamente
  const uniqueAnimals = useMemo(() => {
    const animalNames = new Set();
    animals.forEach(animal => {
      if (animal.animal) {
        animalNames.add(animal.animal);
      }
    });
    return Array.from(animalNames).sort();
  }, [animals]);

  // Filtrar animales por letra seleccionada
  const filteredAnimalNames = useMemo(() => {
    if (!selectedLetter) return uniqueAnimals;
    return uniqueAnimals.filter(name => 
      name.charAt(0).toUpperCase() === selectedLetter
    );
  }, [selectedLetter, uniqueAnimals]);

  return (
    <div className="bg-white shadow-md py-6 px-4 sticky top-[73px] z-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-4">
          <Fish className="w-5 h-5 text-ocean-blue mr-2" />
          <h3 className="text-lg font-semibold text-ocean-deep">Filtrar por animal:</h3>
        </div>
        
        {/* Botón Todos */}
        <div className="mb-3">
          <button
            onClick={() => onLetterChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedLetter
                ? 'bg-ocean-blue text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-ocean-light hover:text-white'
            }`}
          >
            Todos ({uniqueAnimals.length})
          </button>
        </div>

        {/* Alfabeto A-Z */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selecciona una letra:</p>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => {
              const isAvailable = availableLetters.has(letter);
              const isSelected = selectedLetter === letter;
              
              return (
                <button
                  key={letter}
                  onClick={() => isAvailable && onLetterChange(letter)}
                  disabled={!isAvailable}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-ocean-blue text-white shadow-md scale-110'
                      : isAvailable
                      ? 'bg-ocean-light bg-opacity-20 text-ocean-deep hover:bg-ocean-light hover:text-white'
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de animales filtrados */}
        {selectedLetter && filteredAnimalNames.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-ocean-deep mb-2">
              Animales que comienzan con "{selectedLetter}":
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredAnimalNames.map((name, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white text-ocean-deep rounded-full text-sm shadow-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalFilter;
