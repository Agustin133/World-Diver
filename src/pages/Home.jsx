import React from 'react';
import { Waves, Heart, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-ocean-deep via-ocean-blue to-ocean-teal text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-light rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-teal rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ocean-blue rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Waves className="w-16 h-16 mx-auto mb-6 text-ocean-light animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              World Divers
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-ocean-light">
              Descubre cuándo y dónde encontrar la vida marina más fascinante del planeta
            </p>
            <Link
              to="/explorar"
              className="inline-flex items-center bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-light hover:text-white transition-all shadow-lg"
            >
              Explorar Destinos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-white via-blue-50 to-ocean-light to-opacity-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="ocean-waves" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 50 20, 100 50 T 200 50" stroke="#005f73" fill="none" strokeWidth="2"/>
              <path d="M0 60 Q 50 30, 100 60 T 200 60" stroke="#0a9396" fill="none" strokeWidth="1.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#ocean-waves)" />
          </svg>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-ocean-deep mb-4">
              ¿Por qué es importante la vida marina?
            </h2>
            <div className="w-24 h-1 bg-ocean-blue mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                Equilibrio Ecológico
              </h3>
              <p className="text-gray-600">
                Los océanos producen más del 50% del oxígeno que respiramos y absorben grandes cantidades de CO2, regulando el clima global.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                Biodiversidad Única
              </h3>
              <p className="text-gray-600">
                Los océanos albergan el 80% de la vida en la Tierra. Cada especie juega un papel crucial en el ecosistema marino.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-ocean-light bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-deep mb-3">
                Sustento Humano
              </h3>
              <p className="text-gray-600">
                Más de 3 mil millones de personas dependen del océano como fuente principal de proteínas y sustento económico.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-ocean-blue to-ocean-teal rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">Nuestra Misión</h3>
              <p className="text-lg mb-4 leading-relaxed">
                En Marine Season Tracker, creemos que conocer es proteger. Nuestra plataforma conecta a buceadores y amantes del océano con las mejores oportunidades para observar vida marina de manera responsable.
              </p>
              <p className="text-lg leading-relaxed">
                Al planificar viajes basados en las temporadas naturales de migración y reproducción, promovemos el turismo sostenible que respeta los ciclos de vida de las especies marinas y contribuye a su conservación.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-ocean-deep via-ocean-blue to-ocean-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-ocean-light rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura submarina?
          </h2>
          <p className="text-xl text-ocean-light mb-8">
            Únete a miles de buceadores que ya planifican sus viajes con World Divers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/acerca-de"
              className="inline-flex items-center justify-center bg-white text-ocean-blue px-8 py-4 rounded-full font-semibold text-lg hover:bg-ocean-light hover:text-white transition-colors shadow-lg"
            >
              Conoce Nuestra Historia
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-ocean-blue transition-colors shadow-lg"
            >
              Ver Membresías
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
