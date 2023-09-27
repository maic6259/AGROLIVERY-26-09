import { useRecoilState } from "recoil"
import {modalState} from "../atom/modalAtom"
import Modal from "react-modal"
import{CameraIcon} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "firebase/firestore";
import {db, storage} from "../firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { userState } from "@/atom/userAtom";

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentUser] = useRecoilState(userState)

      //funcion cargar imagen
    function addImageToPost(event){
        const reader = new FileReader();
        if (event.target.files[0]){
          reader.readAsDataURL(event.target.files[0]);
        }
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result)
        }
    }

    // funcion subir post
    async function uploadPost(){
      if(loading) return;

      setLoading(true);

      const docRef = await addDoc(collection(db, "posts"), {
          caption: captionRef.current.value,
          descripcion: descripcionRef.current.value,
          valor: valorRef.current.value,
          username: currentUser?.username,
          profileImg: currentUser?.userImg,
          timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `posts/${docRef.id}/image`)
      await uploadString(imageRef, selectedFile, "data_url").then(
        async(snapshot)=>{
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id),{
            image:downloadURL,
          });
        }
      );
      setOpen(false);
      setLoading(false);
      setSelectedFile(null);
    };

    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const descripcionRef = useRef(null);
    const valorRef = useRef(null);

  return (
    <div>
    {open && (
      <Modal 
      className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
      isOpen={open} 
      onRequestClose={()=>{
        setOpen(false);
        setSelectedFile(null);
        }} >
        <div className="flex flex-col justify-center items-center h-[100%]">
          {selectedFile ? (
          <img 
          src={selectedFile} 
          alt="imagen" 
          onClick={()=>setSelectedFile(null)}
          className="w-full max-h-[250px] object-cover cursor-pointer"
          />):(<CameraIcon 
        onClick={()=>filePickerRef.current.click()}
        className="cursor-pointer h-14 bg-red-200  p-2 rounded-full border-2 text-red-500 "/>)}
        <input 
        type="file" 
        hidden  
        ref={filePickerRef} 
        onChange={addImageToPost} 
        />

        <input 
        type="text"  
        maxLength="150" 
        placeholder="Porfavor Ingresa nombre de producto a vender" 
        className="m-4 border-none text-center w-full focus:rin-0 " 
        ref={captionRef}
        />
        <input 
        type="text"  
        maxLength="150" 
        placeholder="Porfavor Ingresa tu descripcion" 
        className="m-4 border-none text-center w-full focus:rin-0 " 
        ref={descripcionRef}
        />  
                <input 
        type="number"  
        maxLength="150" 
        placeholder="Porfavor Ingresa valor del producto" 
        className="m-4 border-none text-center w-full focus:rin-0 " 
        ref={valorRef}
        />  
        <button disabled={!selectedFile || loading}
        onClick={uploadPost}
        className=" w-full bg-red-600 text-white p-2 shadow-md hover:brightness-125 disabled:bg-gray-200 disable:cursor-not-allowed disabled:hover:brightness-100" 
        >Subir Post</button>
        </div>
      </Modal>
    )}
    </div>
  )
}