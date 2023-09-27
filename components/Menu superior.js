import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-semibold text-lg">Mi Aplicación</div>
        <nav className="space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Inicio</a>
          <a href="#" className="text-white hover:text-gray-300">Servicios</a>
          <a href="#" className="text-white hover:text-gray-300">Acerca de nosotros</a>
          <a href="#" className="text-white hover:text-gray-300">Contacto</a>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;
