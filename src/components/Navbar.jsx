import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Heart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-ocean-deep text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" onClick={closeMenu}>
            <Waves className="w-8 h-8 text-ocean-light" />
            <span className="text-lg md:text-xl font-bold">World Divers</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-ocean-blue rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex space-x-6">
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

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Home
            </Link>
            <Link
              to="/explorar"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/explorar') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Explorar
            </Link>
            <Link
              to="/top5"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/top5') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Top 5
            </Link>
            <Link
              to="/servicios"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/servicios') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Servicios
            </Link>
            <Link
              to="/mundo"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/mundo') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Mundo
            </Link>
            <Link
              to="/conservacion"
              onClick={closeMenu}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                isActive('/conservacion') 
                  ? 'bg-red-500 text-white font-semibold' 
                  : 'bg-red-400 bg-opacity-20 text-red-200 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" />
              Conservación
            </Link>
            <Link
              to="/acerca-de"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/acerca-de') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Acerca de
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
