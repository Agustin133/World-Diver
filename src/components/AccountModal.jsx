import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserPlus, X } from 'lucide-react';

const AccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="relative bg-gradient-to-r from-ocean-deep to-ocean-blue p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Tu Cuenta</h2>
          <p className="text-ocean-light">Accede o crea tu cuenta de World Divers</p>
        </div>
        
        <div className="p-6 space-y-4">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full bg-ocean-blue text-white py-4 px-6 rounded-lg font-semibold hover:bg-ocean-teal transition-colors shadow-md"
          >
            <User className="w-5 h-5" />
            Ingresar
          </Link>
          
          <Link
            to="/signup"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full bg-white border-2 border-ocean-blue text-ocean-blue py-4 px-6 rounded-lg font-semibold hover:bg-ocean-light hover:text-white hover:border-ocean-light transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Registrarse
          </Link>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Al crear una cuenta, aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
