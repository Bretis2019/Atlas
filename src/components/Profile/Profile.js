import {useEffect, useState} from "react";
import PieChart from "./PieChart";
import Favourites from "../Trade/Favourites";


export default function Profile(){

    const [username, setUsername] = useState("");
    const [open, setOpen] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
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
            }).catch(err => console.log(err));
        fetch('https://atlasapi-4oe2.onrender.com/user/open', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOpen(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);


    if(loading){
        return (
            <div className={"flex items-center justify-center dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] h-[93svh] border-x-2 md:border-r-0"}>
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true"
                             className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-5 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 border-l-2 dark:border-white border-black row-span-1"}>
                <div className={"flex justify-between py-7 px-4"}>
                    <div className={"text-5xl"}>Profile</div>
                    <div className={'text-3xl'}>{username}</div>
                </div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-5 flex flex-col"}>
                <div className={"flex justify-between flex-col p-2"}>
                    <div className={"py-5 px-2 text-3xl md:text-4xl"}>Portfolio</div>
                </div>
                <div className={"flex justify-center items-center h-full"}>
                    {open.length > 0 && <PieChart open={open}/>}
                </div>
            </div>
            <div className={"row-span-4 md:row-span-4 p-2 flex flex-col"}>
                <div className={"flex justify-between flex-col p-2"}>
                    <div className={"py-5 px-2 text-3xl md:text-4xl"}>Favorites</div>
                </div>
                <div className={"md:overflow-y-scroll"}>
                    <Favourites size={"big"}/>
                </div>
            </div>
        </div>
    )
}