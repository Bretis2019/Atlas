import {useEffect, useState} from "react";

export default function Profile(){

    const [username, setUsername] = useState("");


    useEffect(() => {
        fetch('https://atlasapi-4oe2.onrender.com/user/username', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsername(data);
            })
    }, []);

    return (
        <div className={"w-[100svw] h-[93svh] md:w-[82svw] md:h-[93svh] md:border-l-2 border-t-2 dark:text-white flex flex-col items-center justify-center space-y-4 select-none"}>
            <h1>Welcome back {username}</h1>
        </div>
    )
}