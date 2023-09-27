import { db } from "../firebase";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import Post from "./Post";
import { userState } from "../atom/userAtom"; // Átomo Recoil para gestionar el estado del usuario
import { useRecoilState } from "recoil";

function Posts() {
  // post dummy en caso de exeder uso firebase
  const dummyPosts = [
    {
      id: "1",
      username: "victor",
      userImg:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      img: "https://images.unsplash.com/photo-1678107658617-d20a773469e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      caption: "Nice picture",
    },
    {
      id: "1",
      username: "other",
      userImg:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      img: "https://images.unsplash.com/photo-1678031410792-6b68d9e0bbd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      caption: "Foto dummy para instagram Clon",
    },
  ];
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  // obtener datos posts de todos los usuarios
  useEffect(() => {
    async function fetchData() {
      try {
        const unsubscribe = await onSnapshot(
          query(collection(db, "posts"), orderBy("timestamp", "desc")),
          (snapshot) => {
            setPosts(snapshot.docs);
            posts.map((post) => (
              console.log(post)
            ))
            return () => unsubscribe();
          }
        );
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    fetchData();

  }, [userState]);

  return (
    <div>
      {error ? (dummyPosts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))) : (posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
          descripcion={post.data().descripcion}
          valor={post.data().valor}
        />
      )))}

    </div>
  );
}

export default Posts;
