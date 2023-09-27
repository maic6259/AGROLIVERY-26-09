import Header from "@/components/Header";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/legacy/image"; // Componente para renderizar imágenes con Next.js
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Spline from '@splinetool/react-spline';
import {ContentLogin} from "@/components/ContentLogin";
import { useState } from "react";


export default function SignIn() {
  const router = useRouter();
  
  //Login con google y creacion usuario en firebaseStore
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        });
      }
      router.push("/");
    } catch (error) {
        console.log(error)
    }
  }

  return (
<div className="bg-white dark:bg-teal-400">
        <div className="flex justify-center h-screen">

            
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-black">Agrolivery</h2>
                        <br></br>
                        <p className="mt-3 text-gray-500 dark:text-gray-800">Logueate para probar la aplicacion y disfrutar de las mejores ofertas</p>
                    </div>

                    <div className="mt-8">
                     <br></br>
                    <button onClick={onGoogleClick}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50">
                                    Login con Google
                                </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        

    
  );
}
