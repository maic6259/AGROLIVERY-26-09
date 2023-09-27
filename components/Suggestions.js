import minifaker from "minifaker";
import "minifaker/locales/en";
import { useEffect, useState } from "react";

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    
    // sugerencias para miniprofile
    useEffect(()=> {
        const suggestions = minifaker.array(5,(i)=>({
            username: minifaker.username({locale:"en"}).toLocaleLowerCase(),
            jobTitle: minifaker.jobTitle(),
            id: i,
            img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
        }));
        setSuggestions(suggestions);
    },[])


  return (
    <div className="mt-4 ml-10 ">
       <div className="flex justify-between mb-5 text-sm">
            <h3 className="font-bold text-gray-400 "> Sugerencias</h3>
            <button className="text-gray-600 font-semibold">Ver todas</button>
       </div>
       {suggestions.map(suggestion=>(
        <div key={suggestion.id} className="flex items-center justify-between mt-3">
            <img 
            className="h-10 rounded-full border p-[2px]" src={suggestion.img} alt={suggestion.username} />
            <div className="flex-1 ml-4">
                <h2 className="font-semibold text-sm ">{suggestion.username}</h2>
                <h3 className="text-sm text-gray-400 truncate w-[230px]">{suggestion.jobTitle}</h3>
            </div>
                <button className="font-semibold text-blue-400">Seguir</button>
        </div>
       ))}
    </div>
  )
}

export default Suggestions