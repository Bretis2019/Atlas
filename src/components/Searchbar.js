import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Searchbar(props){
    const {size} = props;
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const getData = setTimeout(() => {
            if(query !== ""){
                setLoading(true);
                fetch(`https://atlasapi-4oe2.onrender.com/search?term=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        if (Array.isArray(data.suggestions)) {
                            setSuggestions(data.suggestions);
                        }
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },500);
        return () => clearTimeout(getData);
    },[query]);

    function handleClick(ticker){
        if(typeof props.setStock === 'function'){
            props.setStock(ticker);
            setQuery("");
        }else{
            setQuery("");
        }
    }

    useEffect(()=>{
        if(typeof props.setStock === 'function'){

            const Elements = suggestions.slice(0,3).map(item =>{
                return (
                    <div onClick={() =>  handleClick(item.ticker)} className={"flex justify-between py-2 px-4 md:hover:bg-gray-200 dark:md:hover:bg-gray-800 cursor-pointer"}>
                        <div className={"text-xl md:text-2xl"}>{item.long}</div>
                        <div className={"text-xl md:text-2xl"}>{item.ticker}</div>
                    </div>
                )
            });
            setCards(Elements);
        }else{
            const Elements = suggestions.slice(0,3).map(item =>{
                return (
                    <Link to={`/Atlas/stock/${item.ticker}`}>
                        <div onClick={() =>  handleClick()} className={"flex justify-between py-2 px-4 md:hover:bg-gray-200 dark:md:hover:bg-gray-800 cursor-pointer"}>
                            <div className={"text-xl md:text-2xl"}>{item.long}</div>
                            <div className={"text-xl md:text-2xl"}>{item.ticker}</div>
                        </div>
                    </Link>
                )
            });
            setCards(Elements);
        }
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
                {(query.length > 0 && suggestions.length > 0 && !loading) &&(
                    <div className={`flex flex-col absolute mt-1 w-full left-0 ${size === "mini" ? "md:w-[26svw]": "md:w-[75svw]"} z-50 text-4xl text-black dark:text-white bg-white dark:bg-black border-2 border-black dark:border-white divide-y-2 divide-black dark:divide-white`}>
                        {cards}
                    </div>
                )}
            </div>

        </>
    )
}