import { userState } from "@/atom/userAtom";
import { getAuth, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";

function MiniProfile() {
  const [currentUser, SetCurrentUser] = useRecoilState(userState);
  const auth = getAuth();

  // logout

  function onSignOut() {
    signOut(auth);
    SetCurrentUser(null);
  }

  return (
    <div  className="flex items-center justify-between mt-14 ml-10">
        <img 
        className="h-16 rounded-full border p-[2px]" 
        src={currentUser?.userImg} 
        alt="user-imagen" />
        <div className="flex-1 ml-4">
            <h2 className="font-bold ">{currentUser?.username}</h2>
            <h3 className="text-sm text-gray-400 ">Bienvenido a instagramClon</h3>
        </div>
        <button 
        className="font-semibold text-blue-400 text-sm" 
        onClick={onSignOut} >Sign Out</button>
    </div>
  )
}

export default MiniProfile