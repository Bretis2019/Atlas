import {useEffect, useState} from "react";

export default function Navbar(props){

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() =>{
        if(query === ""){
            setSuggestions([]);
        }else{
            fetch(`https://atlasapi-4oe2.onrender.com/search?term=${query}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data.suggestions)) {
                        setSuggestions(data.suggestions);
                    } else {
                        if(query === ""){
                            setSuggestions([]);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },[query]);

    function handleClick(ticker){
        props.setStock(ticker);
        setQuery("");
    }

    useEffect(()=>{
        const Elements = suggestions.map(item =>{
            return (
                <div onClick={() =>  handleClick(item.ticker)} className={"flex justify-between py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"}>
                    <div className={"text-xl md:text-2xl"}>{item.long}</div>
                    <div className={"text-xl md:text-2xl"}>{item.ticker}</div>
                </div>
            )
        });
        setCards(Elements);
    },[suggestions]);

    return(
        <div className={"flex flex-col"}>
            <div className={"dark:bg-black dark:text-white flex justify-between w-[100svw] h-[7svh]"}>
                <div className={"hidden md:flex w-[18.1svw] border-r-2 dark:border-white border-black text-4xl  pl-10 items-center"}><h1>ATLAS</h1></div>
                <div onClick={props.onShow} className={"bg-purple-200 flex items-center justify-center md:hidden w-[7svh] border-r-2 dark:border-white border-black text-xl"}><svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="3svh" height="3svh" viewBox="0 0 24.75 24.75" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2 c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2 c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z" /> </g> </g></svg>   </div>
                <div className={"w-[75svw] flex items-center"}>
                    <input value={query} onChange={event => setQuery(event.target.value)} className={"uppercase pl-2 w-[70svw] text-xs md:text-xl md:w-[75svw] h-[7svh] focus:outline-none dark:text-white dark:bg-black dark:placeholder-white"} type={"text"} placeholder={"Search for stocks, ETFs, Bonds..."}/>
                </div>
                <div className={"cursor-pointer h-[7svh] w-[7svh] border-l-2 dark:border-white border-black bg-purple-200 flex justify-center items-center"}>
                    <svg width="3svh" height="3svh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z" fill="#0F0F0F"></path> </g></svg>
                </div>
            </div>
            {suggestions[0] &&
                <div className={"md:w-[81.9svw] top-[7svh] md:left-[18.1svw] absolute flex flex-col h-fit divide-y-2 divide-black dark:divide-white z-50 text-4xl text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white"}>
                    {cards}
                </div>
            }
        </div>
    )
}