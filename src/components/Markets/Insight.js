import Searchbar from "../Searchbar";
import {useEffect, useState} from "react";

export default function Insight(props){

    const [ticker,setTicker] = useState("TSLA");
    const [data, setData] = useState({
        rating: "",
        target: 0,
        stoploss: 0
    });

    function handleClick(ticker){
        setTicker(ticker);
    }

    useEffect(()=>{
        if(ticker.length > 0){
            fetch(`https://atlasapi-4oe2.onrender.com/insight?ticker=${ticker}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },[ticker]);

    return(
        <div  className={"cursor-pointer h-[340px] overflow-y-scroll no-scrollbar"}>
            <div className={"border-2 border-white"}>
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