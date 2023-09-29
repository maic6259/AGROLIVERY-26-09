// miApp.js
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Función para subir un post a Firebase
async function subirPost(username, userImg, img, caption) {
  try {
    // Obtener una referencia a la colección "posts" en Firestore
    const postsCollection = collection(db, "posts");

    // Agregar un nuevo documento a la colección "posts" con los datos del post
    await addDoc(postsCollection, {
      username,
      userImg,
      img,
      caption,
      timestamp: serverTimestamp(), // Agrega una marca de tiempo del servidor
    });

    console.log("Post subido exitosamente a Firebase.");
  } catch (error) {
    console.error("Error al subir el post a Firebase:", error);
  }
}

export { subirPost };