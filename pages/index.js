import Head from 'next/head';
import Header from '../components/Header';
import TopBar from '../components/TopBar'; // Importa el componente TopBar
import Feed from '@/components/Feed';
import UploadModal from '@/components/UploadModal';
import Footer from '../components/Footer';
import CarruselComponent from "@/components/Carrusel";

export default function Home() {
  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <Head>
          <title>Agrolivery</title>
          <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"></link>
          {/* ... tus metadatos ... */}
        </Head>
        {/* Header */}
        <Header />
        <CarruselComponent />
        {/* Feed */}
        <Feed />
        {/* Modal */}
        <UploadModal />
        
        
        {/* Componente Footer */}
        <Footer />
      </div>
    </>
  );
}
