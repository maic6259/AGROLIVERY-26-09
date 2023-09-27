  // Importación de módulos y componentes necesarios
  import Image from "next/legacy/image"; // Componente para renderizar imágenes con Next.js
  import { useEffect } from "react"; // Hook de React para manejar efectos secundarios
  import { MagnifyingGlassIcon, PlusCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"; // Iconos de la biblioteca Heroicons
  import { HomeIcon } from "@heroicons/react/24/solid";
  import { useRecoilState } from "recoil"; // Biblioteca de gestión de estado de React
  import { modalState } from "../atom/modalAtom"; // Importación de un átomo Recoil para gestionar modales
  import { useRouter } from "next/router"; // Router de Next.js para la navegación
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Funciones de autenticación de Firebase
  import { doc, getDoc } from "firebase/firestore"; // Funciones de Firestore de Firebase para recuperar documentos
  import { userState } from "../atom/userAtom"; // Átomo Recoil para gestionar el estado del usuario
  import { db } from "../firebase"; // Instancia de Firestore de Firebase

  export default function Header() {
    // Gestión de estado usando Recoil
    const [open, setOpen] = useRecoilState(modalState); // Gestión del estado de los modales
    const [currentUser, SetCurrentUser] = useRecoilState(userState); // Gestión del estado del usuario
    const router = useRouter(); // Instancia del router para la navegación
    const auth = getAuth(); // Instancia de autenticación de Firebase

    // Hook de efecto para obtener y establecer los datos del usuario actual
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user", user);
          const fetchUser = async () => {
            try {
              // Crear una referencia al documento del usuario en Firestore
              const docRef = doc(db, "users", user.auth.currentUser.providerData[0].uid);
              const docSnap = await getDoc(docRef); // Obtener el documento del usuario
              if (docSnap.exists()) {
                SetCurrentUser(docSnap.data()); // Establecer los datos del usuario actual usando Recoil
              }

            } catch (error) {
              console.log(error);
            }
          };
          fetchUser();
        }
      });
    }, [currentUser]); // Este efecto se ejecutará cada vez que cambie `currentUser`

    // Función para cerrar la sesión del usuario
    function onSignOut() {
      signOut(auth); // Cerrar sesión del usuario usando la autenticación de Firebase
      SetCurrentUser(null); // Limpiar los datos del usuario en el estado de Recoil
    }

    // Renderización del componente del encabezado
    return (
      <div className="shadow-sm border-b sticky top-0 bg-teal-400 z-30">
        <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
          {/* Logotipo */}
          <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid align-items-center">
            <Image
              src="/logo_agrolivery.jpg"
              layout="fill"
              className="object-contain"
              onClick={() => router.push("/")}
            />
          </div>
      

          <p className="text-lg text-gray-700" style={{ textAlign: 'center', marginBottom: '10px' }}>
    ¿Qué quieres buscar hoy?
  </p>

          {/* Búsqueda */}
          <div className="relative mt-2">
            <div className="absolute top-2 left-2">
              <MagnifyingGlassIcon className="h-6 text-gray-500 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Buscar"
              className="bg-gray-50 pl-16 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
            />
          </div>
  {/* Iconos de perfil y navegación */}
  <div className="flex space-x-4 items-center">
    <HomeIcon
      className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
      onClick={() => router.push("/")}
    />
    {currentUser ? (
      <>
        <PlusCircleIcon
          onClick={() => setOpen(true)} // Abrir un modal (manejado por Recoil)
          className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
        />
         <ArrowRightOnRectangleIcon 
        onClick={() => onSignOut()} // Abrir un modal (manejado por Recoil)
          className="hidden lg:inline-grid h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
        />
        <img
          onClick={onSignOut} // Cerrar sesión del usuario
          src={currentUser?.userImg}
          alt="imagen-de-usuario"
          className="h-10 rounded-full cursor-pointer"
        />
        <div className="hidden lg:inline-grid h-6">
        <h2 className="font-bold ">{currentUser?.username}</h2>
        </div>
       
      </>
    ) : (
      <>
        <button onClick={() => router.push("/auth/signin")}>Iniciar sesión</button>
        <span className="text-gray-500 text-sm">|</span> {/* Separador */}
        <button onClick={() => router.push("/auth/signup")}>Registrarse</button> {/* Agregar botón para registrarse */}
      </>
    )}
          </div>
        </div>
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
  }
