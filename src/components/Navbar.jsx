import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Heart } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-ocean-deep text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Waves className="w-8 h-8 text-ocean-light" />
            <span className="text-xl font-bold">Marine Season Tracker</span>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/explorar"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/explorar') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Explorar
            </Link>
            <Link
              to="/top5"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/top5') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Top 5
            </Link>
            <Link
              to="/servicios"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/servicios') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Servicios
            </Link>
            <Link
              to="/mundo"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/mundo') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Mundo
            </Link>
            <Link
              to="/conservacion"
              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                isActive('/conservacion') 
                  ? 'bg-red-500 text-white font-semibold shadow-lg' 
                  : 'bg-red-400 bg-opacity-20 text-red-200 hover:bg-red-500 hover:text-white font-semibold'
              }`}
            >
              <Heart className="w-4 h-4" />
              Conservación
            </Link>
            <Link
              to="/acerca-de"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/acerca-de') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Acerca de
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
