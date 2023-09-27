import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useRecoilState } from "recoil";
import { userState } from "@/atom/userAtom";



export default function Feed() {
const [currentUser] = useRecoilState(userState);

  return (
    <main className={`grid ${currentUser ? "grid-cols-1 md:grid-cols-1 md:max-w-6xl mx-auto": "grid-cols-1 md:grid-cols-1 md:max-w-3xl mx-auto"} `} >
        <section className="md:col-span-2 ">
            {/* stories */}
            {/* <Stories /> */}
            {/* posts */}
            
            <Posts />
        </section>
            


    </main>
  )
}

{/* <section className="hidden md:inline-grid md:col-span-1 ">
<div className="fixed w-[380px]">
mini profile
<MiniProfile />
sugestions
<Suggestions />
</div>

</section> */}
