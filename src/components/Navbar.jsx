import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Waves, Heart, Menu, X, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AccountModal from './AccountModal';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  
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
              {t('nav.home')}
            </Link>
            <Link
              to="/explorar"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/explorar') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              {t('nav.explore')}
            </Link>
            <Link
              to="/top5"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/top5') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              {t('nav.top5')}
            </Link>
            <Link
              to="/destinos"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/destinos') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Destinos
            </Link>
            <Link
              to="/beneficios"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/beneficios') || isActive('/servicios') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              Beneficios
            </Link>
            <Link
              to="/mundo"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/mundo') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              {t('nav.world')}
            </Link>
            <Link
              to="/acerca-de"
              className={`hover:text-ocean-light transition-colors ${
                isActive('/acerca-de') ? 'text-ocean-light font-semibold' : ''
              }`}
            >
              {t('nav.about')}
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
              {t('nav.conservation')}
            </Link>
            
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-3 py-1 rounded-lg transition-colors ${
                  isActive('/admin') 
                    ? 'bg-purple-600 text-white font-semibold' 
                    : 'bg-purple-500 text-white hover:bg-purple-600 font-semibold'
                }`}
              >
                Admin
              </Link>
            )}
            
            {/* Botón de idioma oculto para versión 2 */}
            {/* <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-ocean-blue hover:bg-ocean-teal transition-colors"
              title="Cambiar idioma / Change language"
            >
              <Languages className="w-4 h-4" />
              <span className="font-semibold">{language.toUpperCase()}</span>
            </button> */}
            
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ocean-blue hover:bg-ocean-teal transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm text-gray-600">Plan actual</p>
                        <p className="font-semibold text-ocean-blue capitalize">{user?.membershipPlan}</p>
                      </div>
                      <Link
                        to="/membresias"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <Crown className="w-4 h-4" />
                        Membresías
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-ocean-blue rounded-lg hover:bg-ocean-teal transition-colors font-semibold"
                >
                  <User className="w-5 h-5" />
                  Tu Cuenta
                </button>
              )}
            </div>
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
              to="/destinos"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/destinos') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Destinos
            </Link>
            <Link
              to="/beneficios"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/beneficios') || isActive('/servicios') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              Beneficios
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
              to="/acerca-de"
              onClick={closeMenu}
              className={`block py-2 px-4 rounded-lg transition-colors ${
                isActive('/acerca-de') ? 'bg-ocean-blue text-white font-semibold' : 'hover:bg-ocean-blue'
              }`}
            >
              {t('nav.about')}
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
            
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive('/admin') 
                    ? 'bg-purple-600 text-white font-semibold' 
                    : 'bg-purple-500 text-white hover:bg-purple-600 font-semibold'
                }`}
              >
                Admin Panel
              </Link>
            )}
            
            {/* Botón de idioma oculto para versión 2 */}
            {/* <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 py-2 px-4 rounded-lg bg-ocean-blue hover:bg-ocean-teal transition-colors font-semibold"
            >
              <Languages className="w-4 h-4" />
              {language === 'es' ? 'Español' : 'English'}
            </button> */}
            
            <div className="border-t border-ocean-blue border-opacity-30 mt-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-ocean-light text-sm">
                    {user?.name}
                  </div>
                  <Link
                    to="/membresias"
                    onClick={closeMenu}
                    className="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-ocean-blue"
                  >
                    <Crown className="w-4 h-4" />
                    Membresías
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                      navigate('/');
                    }}
                    className="flex items-center gap-2 w-full py-2 px-4 rounded-lg hover:bg-red-500 text-red-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAccountModalOpen(true);
                    closeMenu();
                  }}
                  className="flex items-center gap-2 w-full py-2 px-4 rounded-lg bg-ocean-blue hover:bg-ocean-teal font-semibold"
                >
                  <User className="w-5 h-5" />
                  Tu Cuenta
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AccountModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
