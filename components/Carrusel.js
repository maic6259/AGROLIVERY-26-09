import React, { useState } from 'react';
import styles from './carrusel.module.css'; // Importa tus estilos CSS aquí

const CarruselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['https://www.lasalle.edu.co/wcm/connect/d6493f01-21b8-46fc-90e9-6011ed9a3a18/07.06.22.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-d6493f01-21b8-46fc-90e9-6011ed9a3a18-o95WiEQ', 
  'https://www.nuestratiendaartesanal.com/blogold/wp-content/uploads/2018/10/tienda-de-artesanias-en-colombia2.jpg', 
  'https://grupoexcala.com/wp-content/uploads/2022/07/Fuentes-de-financiacion-para-el-sector-agro-en-Colombia-2.png'];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.carousel}>
      <button onClick={prevSlide} className={styles.prevButton}>
        Prev
      </button>
      <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} className={styles.image} />
      <button onClick={nextSlide} className={styles.nextButton}>
        Next
      </button>
    </div>
  );
};

export default CarruselComponent;