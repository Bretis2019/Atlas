import Searchbar from "../Searchbar";
import {useEffect, useState} from "react";

export default function Insight(props){

    const [ticker,setTicker] = useState("TSLA");
    const [data, setData] = useState({
        rating: "",
        target: 0,
        stoploss: 0
    });
    const [loading, setLoading] = useState(false);

    function handleClick(ticker){
        setTicker(ticker);
    }

    useEffect(()=>{
        if(ticker.length > 0){
            setLoading(true)
            fetch(`https://atlasapi-4oe2.onrender.com/insight?ticker=${ticker}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },[ticker]);

    if(loading){
        return(
            <div className={"dark:bg-black dark:divide-white dark:text-white flex justify-center items-center"}>
                <h1 className={"text-3xl md:text-5xl text-center"}>Loading...</h1>
            </div>
        )
    }

    if(!data || !data.rating || data.rating.length === 0){
        return(
            <div className={"flex flex-col dark:bg-black dark:divide-white dark:text-white space-y-4 justify-center items-center"}>
                <h1 className={"text-3xl md:text-5xl text-center"}>Not enough information.</h1>
                <button onClick={() => setTicker("TSLA")} className={"cursor-pointer rounded-full border-2 dark:border-white dark:md:hover:bg-gray-900 border-black px-2 py-2 md:hover:bg-gray-200"}>Reset</button>
            </div>
        )
    }

    return(
        <div  className={"cursor-pointer h-[340px] overflow-y-scroll no-scrollbar"}>
            <div className={"border-y-2 border-black dark:border-white"}>
                <Searchbar size={"mini"} setStock={handleClick}/>
            </div>
            <div onClick={() =>  props.setStock(ticker)} className="flex flex-col justify-center text-center pt-8">
                <div className={"text-xl"}>{ticker}</div>
                <div className={"text-8xl pt-2 pb-8"}>{data.rating}</div>
                <div className="flex flex-col space-y-2 space-x-4 text-xl text-center">
                    <div>Target: ${data.target}</div>
                    <div>Stop loss: ${data.stoploss.toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}