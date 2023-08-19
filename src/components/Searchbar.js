import {useEffect, useState} from "react";

export default function Searchbar(props){
    const {size} = props;
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() =>{
        if(query !== ""){
            fetch(`https://atlasapi-4oe2.onrender.com/search?term=${query}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data.suggestions)) {
                        setSuggestions(data.suggestions);
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
        <>
            <div className={"relative"}>
                <input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className={`uppercase pl-2 ${size === "mini" ? "md:w-[26svw]": "md:w-[75svw]"} w-[70svw] md:w-[75svw] text-xs md:text-xl h-[7svh] focus:outline-none dark:text-white dark:bg-black dark:placeholder-white`}
                    type={"text"}
                    placeholder={"Search for stocks"}
                />
                {query.length > 0 && (
                    <div className={`absolute mt-1 w-full left-0 ${size === "mini" ? "md:w-[26svw]": "md:w-[75svw]"} z-50 text-4xl text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white`}>
                        {cards}
                    </div>
                )}
            </div>

        </>
    )
}