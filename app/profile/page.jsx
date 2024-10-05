'use client';

import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const page = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    // const {data: session} = useSession();
    

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        
        const fetchPosts = async () => {
            const session = await getSession();
            if(session?.user.id){
                const response = await fetch(`/api/users/${session?.user.id}/posts`);
                const data = await response.json();
                setPosts(data);
            }
        }
        fetchPosts();
    }, []);

  return (
    <Profile 
        name="Mon"
        desc="Bienvenue dans votre page de profil personnalisée"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default page