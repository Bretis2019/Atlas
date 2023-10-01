import {useEffect, useState} from "react";
import MiniCard from "./MiniCard";
import CandleStock from "./CandleStock";
import BarChart from "./BarChart";
import "./StockDescription.css"
import {Link, useParams} from "react-router-dom";
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

export default function Stock(){
    const {ticker} = useParams();

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
    const [favorite, setFavorite] = useState(false);


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
        fetch('https://atlasapi-4oe2.onrender.com/user/favorites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.includes(ticker)){
                    setFavorite(true);
                }else{
                    setFavorite(false);
                }
            }).catch(err => console.log(err));
    },[ticker]);

    useEffect(() => {
        const cardElements = recommendations.map(item => {
            return (<MiniCard ticker={item.symbol} key={item.symbol}/>);
        });
        setCards(cardElements);
    }, [recommendations]);

    function handleFavorite(){
        setFavorite(prevState => !prevState);

        const raw = JSON.stringify({
            "ticker": ticker,
        });

        fetch('https://atlasapi-4oe2.onrender.com/user/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: raw
        }).catch(err => console.log(err));
    }

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
                    <Link to={"/Atlas/"}>
                        <button className={"cursor-pointer rounded-full border-2 dark:border-white dark:md:hover:bg-gray-900 border-black px-2 py-2 md:hover:bg-gray-200"}>Reset</button>
                    </Link>
                </div>
            </div>
        )
    }

    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-6 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className="flex flex-col border-t-2 dark:border-white border-black border-l-2 row-span-3">
                <div className={"flex justify-between max-h-[35px] cursor-pointer pb-12"}>
                    <Link to={`/Atlas/order/${ticker}`}>
                        <div className={"cursor-pointer bg-purple-200 text-black text-2xl border-r-2 border-b-2 dark:border-white border-black px-1 py-1 flex items-center"}>
                            <div className={"px-1"}>BUY/SELL</div>
                            <svg className={"self-start fill-black stroke-black"} height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enableBackground="new 0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <polygon points="186.1,0.1 93.1,93.2 349,93.2 0,442.2 69.8,512 418.8,163 418.8,418.9 511.9,325.9 512,0 " /> </g></svg>
                        </div>
                    </Link>
                    <div className={"pr-2"}>
                        {favorite ?
                            <svg className={"mt-1 fill-black dark:fill-white"} onClick={handleFavorite} version="1.1" width="25px" height="25px" viewBox="0 0 1080 1080" xmlSpace="preserve"><desc>Created with Fabric.js 5.2.4</desc><defs></defs><g transform="matrix(1 0 0 1 540 540)" id="463eec18-177c-456c-baa3-99bac7fecce7"><rect style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255,255,255)', fillRule: 'nonzero', opacity: 1, visibility: 'hidden'}} vectorEffect="non-scaling-stroke" x={-540} y={-540} rx={0} ry={0} width={1080} height={1080} /></g><g transform="matrix(1 0 0 1 540 540)" id="2972cbe5-8470-4c84-b55c-4f3e12cfd6a3"></g><g transform="matrix(9.86 -9.86 9.07 9.07 719.16 706.17)"><path style={{stroke: 'rgb(255,0,0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255,0,0)', fillRule: 'nonzero', opacity: 1}} vectorEffect="non-scaling-stroke" transform=" translate(-50, -50)" d="M 81.866 18.883 C 78.577 15.594 74.54 13.998999999999999 69.80799999999999 14.049 C 62.38099999999999 14.149 56.001999999999995 18.183999999999997 50.773999999999994 26.208 L 50.773999999999994 26.157999999999998 L 49.47599999999999 28.549 C 49.47599999999999 28.549 48.92999999999999 27.502 48.129999999999995 26.058 L 48.129999999999995 26.257 C 46.187 22.271 43.69799999999999 19.330000000000002 40.706999999999994 17.337000000000003 C 37.71699999999999 15.394000000000004 34.37899999999999 14.446000000000003 30.791999999999994 14.446000000000003 C 26.056999999999995 14.496000000000004 21.919999999999995 16.041000000000004 18.383999999999993 18.981 C 14.843999999999994 21.972 13.151999999999994 25.808 13.151999999999994 30.441000000000003 C 13.199999999999994 32.036 13.700999999999993 34.378 14.645999999999994 37.418000000000006 C 16.440999999999995 41.952000000000005 21.076999999999995 47.83200000000001 28.697999999999993 55.10600000000001 C 36.27199999999999 62.38100000000001 41.556 67.81200000000001 44.49499999999999 71.4 C 47.48499999999999 74.938 49.42899999999999 79.822 50.32499999999999 85.95100000000001 C 51.07399999999999 80.569 53.86099999999999 75.138 58.79599999999999 69.756 C 63.72999999999999 64.324 69.359 58.346000000000004 75.73899999999999 51.769000000000005 C 82.06599999999999 45.19200000000001 85.60199999999999 40.159000000000006 86.303 36.62100000000001 C 86.7 35.37600000000001 86.849 33.732000000000006 86.849 31.640000000000008 C 86.8 26.457 85.104 22.172 81.866 18.883 z" strokeLinecap="round" /></g><g transform="matrix(-67.5 0 0 67.5 540 540)"><path className={"fill-black dark:fill-white"} style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fillRule: 'evenodd', opacity: 1}} transform=" translate(-8, -8)" d="M 8 8 L 8 5 C 8 3.3431457505076194 6.656854249492381 2 5 2 C 3.3431457505076194 2 2 3.3431457505076194 2 5 L 2 14 L 11 14 C 12.65685424949238 14 14 12.65685424949238 14 11 C 14 9.34314575050762 12.65685424949238 8 11 8 L 8 8 z M 10 6 L 11 6 C 13.761423749153966 6 16 8.238576250846032 16 11 C 16 13.761423749153966 13.761423749153968 16 11.000000000000002 16 L 0 16 L 0 5 C 0 2.238576250846033 2.238576250846033 0 5 0 C 7.761423749153967 0 10 2.2385762508460316 10 4.999999999999999 L 10 6 z" strokeLinecap="round" /></g></svg>
                            :
                            <svg className={"mt-1 fill-black dark:fill-white"} onClick={handleFavorite}  width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M8 8V5a3 3 0 1 0-6 0v9h9a3 3 0 0 0 0-6H8zm2-2h1a5 5 0 0 1 0 10H0V5a5 5 0 1 1 10 0v1z" fillRule="evenodd" /> </g></svg>
                        }
                    </div>
                </div>
                <div className={""}>
                    <Link to={`/Atlas/order/${ticker}`}>
                        <div className={"cursor-pointer pb-2 px-4 flex justify-between items-center space-x-4"}>
                            <div className="flex items-center">
                                <img className={"h-[50px] w-[50px] object-contain rounded-lg"} src={getFirstWord(description.name) === "Meta" ? "https://logo.clearbit.com/https://www.meta.com" : description.logo} alt={description.name + "logo"} loading="lazy"/>
                                <div className={`px-2 ${getFirstWord(description.name).length > 9 ? "text-2xl" : "text-3xl"} md:text-4xl`}>{getFirstWord(description.name)}</div>
                            </div>
                            <div className={"flex max-md:flex-col space-x-4 max-md:space-y-4 items-center"}>
                                <div className={"text-2xl bg-black rounded-full px-2"}>${description.price.toFixed(2)}</div>
                                <div className={`text-2xl text-${description.change < 0 ? "red-700" : "green-700"}`}>{roundToFirstNonZeroDecimal(description.change * 100)}%</div>
                            </div>
                        </div>
                    </Link>
                    <div className={"py-2 space-y-4 px-2  border-t-2 dark:border-white border-black space-x-4 flex flex-col overflow-hidden max-h-[330px] md:max-h-[235px]"}>
                        <div className="flex justify-between">
                            <div className="text-4xl px-2">Description</div>
                            <button onClick={() => {window.location.href = description.logo.replace("https://logo.clearbit.com/", "")}} className={"cursor-pointer rounded-full border-2 dark:border-white dark:md:hover:bg-gray-900 border-black px-2 py-2 md:hover:bg-gray-200"}>Site</button>
                        </div>
                        <div className={"cutoff-text"}>{description.description}</div>
                    </div>
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
                        {convertDateFormat(description.earnings_date[0]) !== "NaN-NaN-NaN" && <div className={"text-xl"}>{convertDateFormat(description.earnings_date[0])}</div>}
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