import StockChart from "./StockChart";
import {useEffect, useState} from "react";

export default function Losers(props){

    const [array, setArray] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        fetch(`https://atlasapi-4oe2.onrender.com/losers`)
            .then(response => response.json())
            .then(data => {
                setArray(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    const Elements =  array.slice(0,3).map(item => {
        const formattedPrice = parseFloat(item.price).toFixed(2);
        const formattedPercentage = parseFloat(item.change).toFixed(2);
        return(
            <div onClick={() =>  props.setStock(item.symbol)} className={"flex items-center justify-between space-y-4 cursor-pointer"}>
                <div className={"text-xl font-bold"}>{item.symbol}</div>
                <div><StockChart name={item.symbol}/></div>
                <div className={"flex flex-col text-end"}>
                    <div className={"text-red-700 text-xl"}>{formattedPercentage}%</div>
                    <div>${formattedPrice}</div>
                </div>
            </div>
        )
    })

    if(loading){
        return (
            <h1 className={"text-center text-4xl"}>Loading...</h1>
        )
    }

    return(
        <div className={"flex flex-col space-y-3"}>
            {Elements}
        </div>
    )
}