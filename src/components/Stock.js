import {useEffect, useState} from "react";
import MiniCard from "./MiniCard";
import CandleStock from "./CandleStock";
import BarChart from "./BarChart";

function roundToFirstNonZeroDecimal(number) {
    const strNumber = number.toString();
    const decimalIndex = strNumber.indexOf('.');

    if (decimalIndex !== -1) {
        for (let i = decimalIndex + 1; i < strNumber.length; i++) {
            if (strNumber[i] !== '0') {
                return parseFloat(number.toFixed(i - decimalIndex));
            }
        }
    }

    return number;
}

export function getFirstWord(str) {
    str = str.trim();

    const firstSpaceIndex = str.indexOf(' ');

    if (firstSpaceIndex === -1) {
        return cleanString(str);
    }

    const firstWord = str.substring(0, firstSpaceIndex);
    return cleanString(firstWord);
}

function cleanString(str) {
    return str.replace(/[^a-zA-Z]+/g, '');
}

function convertDateFormat(dateString) {
    const inputDate = new Date(dateString);

    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default function Stock(props){
    const {ticker} = props;

    const [description, setDescription] = useState({
        logo: "",
        description: "",
        name: "",
        price: 0,
        change: 0,
        earnings_date: [],
        past_earnings: [],
    });

    const [recommendations, setRecommendations] = useState([]);
    const [span, setSpan] = useState("day");
    const [cards, setCards] = useState([]);


    useEffect(() => {
        fetch(`https://atlasapi-4oe2.onrender.com/description?ticker=${ticker}`)
            .then(response => response.json())
            .then(data => {
                setDescription(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch(`https://atlasapi-4oe2.onrender.com/recommendations?ticker=${ticker}`)
            .then(response => response.json())
            .then(data => {
                setRecommendations(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[ticker]);

    useEffect(() => {
        const cardElements = recommendations.map(item => {
            return (<MiniCard ticker={item.symbol} key={item.symbol} setStock={props.setStock}/>);
        });
        setCards(cardElements);
    }, [recommendations]);

    if(!description || !description.name || description.name.length === 0){
        return(
            <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] border-t-2 border-l-2 flex justify-center items-center"}>
                <h1 className={"text-5xl"}>Sorry we don't have that ticker yet</h1>
            </div>
        )
    }

    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-6 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"py-7 px-4 flex items-center space-x-4"}>
                    <img className={"h-[50px] w-[50px] object-contain rounded-lg"} src={getFirstWord(description.name) === "Meta" ? "https://logo.clearbit.com/https://www.meta.com" : description.logo} alt={description.name + "logo"} loading="lazy"/>
                    <div className={"text-4xl"}>{getFirstWord(description.name)}</div>
                    <div className={"text-2xl"}>${description.price.toFixed(2)}</div>
                    <div className={`text-xl text-${description.change < 0 ? "red-700" : "green-700"}`}>{roundToFirstNonZeroDecimal(description.change)}%</div>
                </div>
                <div className={"py-2 space-y-4 px-2  border-t-2 dark:border-white border-black space-x-4 flex flex-col overflow-hidden max-h-[330px] md:max-h-[235px]"}>
                    <div className="text-4xl px-2">Description</div>
                    <div>{description.description}</div>
                </div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-4"}>
                <div className={"flex flex-col px-4 py-2"}>
                    <CandleStock ticker={ticker} span={span}/>
                    <div className="flex pt-8 space-x-4 justify-center items-center overflow-x-scroll no-scrollbar">
                        <button name="hour" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "hour" ? 'bg-green-300 dark:bg-green-900': ''}`}>Hour</button>
                        <button name="day" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "day" ? 'bg-green-300 dark:bg-green-900': ''}`}>Day</button>
                        <button name="week" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "week" ? 'bg-green-300 dark:bg-green-900': ''}`}>Week</button>
                        <button name="month" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "month" ? 'bg-green-300 dark:bg-green-900': ''}`}>Month</button>
                        <button name="year" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "year" ? 'bg-green-300 dark:bg-green-900': ''}`}>Year</button>
                        <button name="all" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-white px-4 py-2 rounded-full hover:bg-gray-800 ${span === "all" ? 'bg-green-300 dark:bg-green-900': ''}`}>All</button>
                    </div>
                </div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"px-4 py-2"}>
                    <div className="flex justify-between items-center">
                        <div className="text-4xl">Earnings</div>
                        <div className={"text-xl"}>{convertDateFormat(description.earnings_date[0])}</div>
                    </div>
                    {description.past_earnings[0] &&
                        <div>
                        <BarChart data={description.past_earnings} />
                    </div>}
                </div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-2"}>
                <div className={"px-4 py-2"}>
                    <div className={"px-4 py-2  text-4xl"}>Recommended</div>
                    <div className={"px-4 py-2 flex overflow-x-scroll max-h-[250px] space-x-4 max-md:no-scrollbar"}>
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    )
}