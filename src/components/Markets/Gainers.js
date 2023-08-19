import StockChart from "./StockChart";
import {useEffect, useState} from "react";

export default function Gainers(props){
    const [array, setArray] = useState([]);
    useEffect(()=>{
        fetch(`https://atlasapi-4oe2.onrender.com/gainers`)
            .then(response => response.json())
            .then(data => {
                setArray(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    const Elements =  array.map(item => {
        const formattedPrice = parseFloat(item.price).toFixed(2);
        const formattedPercentage = parseFloat(item.change).toFixed(2);
        return(
            <div onClick={() =>  props.setStock(item.symbol)} className={"flex items-center justify-between space-y-4 cursor-pointer"}>
                <div className={"text-xl font-bold"}>{item.symbol}</div>
                <div><StockChart name={item.symbol}/></div>
                <div className={"flex flex-col text-end"}>
                    <div className={"text-green-700 text-xl"}>{formattedPercentage}%</div>
                    <div>${formattedPrice}</div>
                </div>
            </div>
        )
    })
    return(
        <div className={"flex flex-col space-y-3"}>
            {Elements}
        </div>
    )
}