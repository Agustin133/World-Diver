import React from 'react';
import { Calendar } from 'lucide-react';

const FilterBar = ({ selectedMonth, onMonthChange }) => {
  const months = [
    { value: 0, label: 'Todos' },
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' },
  ];

  return (
    <div className="bg-white shadow-md py-6 px-4 sticky top-0 z-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-ocean-blue mr-2" />
          <h3 className="text-lg font-semibold text-ocean-deep">Filtrar por mes:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {months.map((month) => (
            <button
              key={month.value}
              onClick={() => onMonthChange(month.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedMonth === month.value
                  ? 'bg-ocean-blue text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-ocean-light hover:text-white'
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
