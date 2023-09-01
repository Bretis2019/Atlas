import {useEffect, useState} from "react";
import MiniCard from "./MiniCard";
import CandleStock from "./CandleStock";
import BarChart from "./BarChart";
import "./StockDescription.css"
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

    const firstSpaceIndex = str.search(/[\s,\.]/);

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
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://atlasapi-4oe2.onrender.com/description?ticker=${ticker}`)
            .then(response => response.json())
            .then(data => {
                setDescription(data);
                setIsLoading(false);
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

    if(isLoading){
        return (
            <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] h-[93vh] md:w-[82svw] md:h-[93svh] border-2 flex justify-center items-center"}>
                <div className="text-center">
                    <div role="status">
                        <svg aria-hidden="true"
                             className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    if(!description || !description.name || description.name.length === 0){
        return(
            <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] h-[93vh] border-2 flex justify-center items-center"}>
                <div className="flex flex-col items-center space-y-4">
                    <h1 className={"text-3xl md:text-5xl text-center"}>Sorry we don't have that ticker yet</h1>
                    <button onClick={() => props.setStock("")} className={"cursor-pointer rounded-full border-2 dark:border-white dark:md:hover:bg-gray-900 border-black px-2 py-2 md:hover:bg-gray-200"}>Reset</button>
                </div>
            </div>
        )
    }

    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-6 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div onClick={() => props.onPageChange("Order")} className={"cursor-pointer py-7 px-4 flex justify-between items-center space-x-4"}>
                    <div className={"absolute top-16 right-2 md:top-14 md:right-[41svw]"}>
                        <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier">{" "}<path className={"dark:stroke-white"} d="M7 17L17 7M17 7H8M17 7V16" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>{" "}</g></svg>
                    </div>
                    <div className="flex items-center">
                        <img className={"h-[50px] w-[50px] object-contain rounded-lg"} src={getFirstWord(description.name) === "Meta" ? "https://logo.clearbit.com/https://www.meta.com" : description.logo} alt={description.name + "logo"} loading="lazy"/>
                        <div className={"px-2 text-3xl md:text-4xl"}>{getFirstWord(description.name)}</div>
                    </div>
                    <div className={"flex max-md:flex-col space-x-4 max-md:space-y-4 items-center"}>
                        <div className={"text-2xl"}>${description.price.toFixed(2)}</div>
                        <div className={`text-2xl text-${description.change < 0 ? "red-700" : "green-700"}`}>{roundToFirstNonZeroDecimal(description.change)}%</div>
                    </div>
                </div>
                <div className={"py-2 space-y-4 px-2  border-t-2 dark:border-white border-black space-x-4 flex flex-col overflow-hidden max-h-[330px] md:max-h-[235px]"}>
                    <div className="flex justify-between">
                        <div className="text-4xl px-2">Description</div>
                        <button onClick={() => {window.location.href = description.logo.replace("https://logo.clearbit.com/", "")}} className={"cursor-pointer rounded-full border-2 dark:border-white dark:md:hover:bg-gray-900 border-black px-2 py-2 md:hover:bg-gray-200"}>Visit site</button>
                    </div>
                    <div className={"cutoff-text"}>{description.description}</div>
                </div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-4"}>
                <div className={"flex flex-col px-4 py-2"}>
                    <CandleStock ticker={ticker} span={span}/>
                    <div className="flex pt-8 space-x-2 md:space-x-4 md:justify-center items-center overflow-x-scroll no-scrollbar">
                        <button name="hour" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "hour" ? 'bg-green-300 dark:bg-green-900': ''}`}>Hour</button>
                        <button name="day" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "day" ? 'bg-green-300 dark:bg-green-900': ''}`}>Day</button>
                        <button name="week" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "week" ? 'bg-green-300 dark:bg-green-900': ''}`}>Week</button>
                        <button name="month" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "month" ? 'bg-green-300 dark:bg-green-900': ''}`}>Month</button>
                        <button name="year" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "year" ? 'bg-green-300 dark:bg-green-900': ''}`}>Year</button>
                        <button name="all" onClick={(event) => setSpan(event.target.name)} className={`border-2 border-black dark:border-white px-4 py-2 rounded-full md:hover:bg-gray-200 dark:md:hover:bg-gray-800 ${span === "all" ? 'bg-green-300 dark:bg-green-900': ''}`}>All</button>
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