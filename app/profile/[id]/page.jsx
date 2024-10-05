'use client';

import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";


const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setUserPosts(data);  
        }
        if(params?.id) fetchPosts();
    }, [params.id]);

  return (
    <Profile 
        name={userName}
        desc={`Bienvenue sur la page de profil personnalisée de ${userName}. Découvrez les prompts exceptionnels de ${userName} et laissez-vous inspirer par la puissance de son imagination.`}
        data={userPosts}
    />
  )
}

export default UserProfile;