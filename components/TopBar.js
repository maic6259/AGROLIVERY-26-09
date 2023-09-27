import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-bg-teal-600 p-4 fixed top-20 w-full bg-teal-400">
      <div className="container mx-auto flex justify-center items-start">
        <nav className="space-x-4">
          <a href="#" className="text-black hover:text-gray-300">Categorias</a>
          <a href="#" className="text-black hover:text-gray-300">Ofertas</a>
          <a href="#" className="text-black hover:text-gray-300">Vender</a>
          <a href="#" className="text-black hover:text-gray-300">Ayuda / PQR</a>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;