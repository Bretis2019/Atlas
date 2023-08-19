import React, {useEffect, useState} from "react";
import StockChart from "../Markets/StockChart";

export default function Favourites(props) {

    const [tickerData, setTickerData] = useState([]);
    const tickersArray = props.array;

    useEffect(() => {
        async function fetchQuotesForTickers() {
            const baseUrl = "https://atlasapi-4oe2.onrender.com/quote?ticker=";

            const fetchPromises = tickersArray.map(async ticker => {
                const url = baseUrl + encodeURIComponent(ticker);
                const response = await fetch(url);
                const data = await response.json();
                return { ...data, symbol: ticker };
            });

            try {
                const results = await Promise.all(fetchPromises);
                setTickerData(results);
                console.log(results);
            } catch (error) {
                console.error("Error fetching quotes:", error);
            }
        }

        fetchQuotesForTickers();
    }, [tickersArray]);


    if (!tickerData || tickerData.length === 0) {
        return null;
    }

    const Elements = tickerData.map((item) => {
        return (
            <div onClick={() =>  props.setStock(item.symbol)} className={"flex justify-between items-center cursor-pointer"} key={item.symbol}>
                <div>
                    <h1 className={"text-3xl"}>{item.symbol}</h1>
                    <h1 className={"text-gray-500"}>{item.name}</h1>
                </div>
                <div>
                    <StockChart name={item.symbol}/>
                </div>
                <div className={"w-[20svw] md:w-[7svw] text-end"}>
                    <h1
                        className={`md:text-3xl text-${
                            item.change < 0 ? "red-700" : "green-700"
                        }`}
                    >
                        {Math.round(item.change * 100) / 100}%
                    </h1>
                    <h1 className={"text-gray-500 text-end"}>${item.price}</h1>
                </div>
            </div>
        );
    });

    return <div className={"p-4 space-y-8"}>{Elements}</div>;
}
