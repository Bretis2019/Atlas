import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Sidebar(props){
    const location = useLocation();
    const [page, setPage] = useState(location.pathname);
    useEffect(() => {
        setPage(location.pathname)
        if(show){
            props.onPageChage();
        }
    }, [location]);
    const {show} = props;

    function handleLogout(){
        localStorage.setItem("token", "");
    }

    return(
        <div className={`${show ? 'max-md:absolute': 'hidden'} bg-white w-[100svw] z-40 md:flex border-t-2 border-black dark:bg-black dark:text-white dark:border-white md:w-[18svw] h-[93svh] flex-col md:justify-between`}>
            <div className={"flex flex-col "}>
                <Link to={"/Atlas/dashboard"}>
                    <div className={`${page === "/Atlas/dashboard" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center justify-center  md:justify-start gap-2 pl-2 py-6 md:hover:bg-gray-200 border-b-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="32px" height="32px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path className={"dark:stroke-white"} d="M14.5 19.5V12.5M10.5 12.5V5.5M5.5 12.5H19.5M5.5 19.5H19.5V5.5H5.5V19.5Z" stroke="#000000" strokeWidth="1.2" /> </g></svg>My Dashboard</div>
                </Link>
                <Link to={"/Atlas/"}>
                    <div  className={` ${page === "/Atlas/markets"  ||  page === "/Atlas/" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center justify-center  md:justify-start gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>monitor-trend</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="Combined-Shape" fill="#000000" transform="translate(64.000000, 64.000000)"> <path className={"dark:fill-white"} d="M42.6666667,1.42108547e-14 L42.4939709,343.395437 L384,341.333333 L384,384 L1.42108547e-14,384 L0.172695782,1.42108547e-14 L42.6666667,1.42108547e-14 Z M384,64 L384,192 L341.333333,192 L341.333055,135.367 L233.893601,232.06349 L181.333333,179.52 L79.0849447,281.751611 L48.9150553,251.581722 L181.333333,119.163444 L235.434667,173.248 L309.438055,106.666 L256,106.666667 L256,64 L384,64 Z"> </path> </g> </g> </g></svg>Markets</div>
                </Link>
                <Link to={"/Atlas/trade"}>
                    <div className={` ${page === "/Atlas/trade" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center justify-center  md:justify-start gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>swap-left-right</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="drop" fill="#000000" transform="translate(42.666667, 42.666667)"> <path className={"dark:fill-white"} d="M298.666667,170.666667 L426.666667,298.666667 L298.666667,426.666667 L268.373333,396.373333 L344.96,320 L170.666667,320 L170.666667,277.333333 L344.96,277.333333 L268.373333,200.96 L298.666667,170.666667 Z M128,7.10542736e-15 L158.293333,30.2933333 L81.7066667,106.666667 L256,106.666667 L256,149.333333 L81.7066667,149.333333 L158.293333,225.706667 L128,256 L-2.13162821e-14,128 L128,7.10542736e-15 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>Trade</div>
                </Link>
                <Link to={"/Atlas/profile"}>
                    <div  className={` ${page === "/Atlas/profile" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center justify-center  md:justify-start gap-2 pl-2 py-6 md:hover:bg-gray-200 border-t-2 md:border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>user</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="icon" fill="#000000" transform="translate(85.333333, 42.666667)"> <path className={"dark:fill-white"} d="M170.666667,170.666667 C217.794965,170.666667 256,132.461632 256,85.3333333 C256,38.2050347 217.794965,7.10542736e-15 170.666667,7.10542736e-15 C123.538368,7.10542736e-15 85.3333333,38.2050347 85.3333333,85.3333333 C85.3333333,132.461632 123.538368,170.666667 170.666667,170.666667 Z M170.666667,42.6666667 C194.230816,42.6666667 213.333333,61.769184 213.333333,85.3333333 C213.333333,108.897483 194.230816,128 170.666667,128 C147.102517,128 128,108.897483 128,85.3333333 C128,61.769184 147.102517,42.6666667 170.666667,42.6666667 Z M213.333333,213.333333 L128,213.333333 C57.307552,213.333333 1.42108547e-14,270.640885 1.42108547e-14,341.333333 L1.42108547e-14,426.666667 L341.333333,426.666667 L341.333333,341.333333 C341.333333,270.640885 284.025781,213.333333 213.333333,213.333333 Z M298.666667,384 L42.6666667,384 L42.6666667,341.333333 C42.6666667,294.205035 80.8717013,256 128,256 L213.333333,256 C260.461632,256 298.666667,294.205035 298.666667,341.333333 L298.666667,384 Z" id="user"> </path> </g> </g> </g></svg>Profile</div>
                </Link>
            </div>
            <Link to={"/Atlas/landing"}>
                <div onClick={handleLogout} className={"cursor-pointer py-6 text-xl pl-2 border-t-2 border-black dark:border-white flex items-center gap-2 md:hover:bg-gray-200 dark:md:hover:bg-gray-900 justify-center  md:justify-start"}><svg fill="#000000" height="30px" width="30px" version="1.1" id="XMLID_173_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 26" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="logout"> <g> <path  className={"dark:fill-white"} d="M15,24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4,18.7L17,17.3l3.3-3.3H5v-2h15.3L17,8.7l1.4-1.4L24,13L18.4,18.7z" /> </g> </g> </g></svg>Logout</div>
            </Link>
        </div>
    )
}