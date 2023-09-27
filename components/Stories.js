import { userState } from "@/atom/userAtom";
import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Story from "./Story";


export default function Stories() {
  const [storyUsers, setStoryUser] = useState([]);
  const [currentUser] = useRecoilState(userState);

  //generar array minifaker 20 perfiles
  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUser(storyUsers);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
    {currentUser && (
    <Story img={currentUser?.userImg} username={currentUser?.name} isUser="true"/>)}
    {storyUsers.map(user=>(
        <Story key={user.id} username={user.username} img={user.img} />
    ))}
  </div>
  )
}
