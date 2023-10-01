import Gainers from "./Gainers";
import Losers from "./Losers";
import Traded from "./Traded";
import {useEffect, useState} from "react";
import Insight from "./Insight";
import {Link} from "react-router-dom";

export default function Markets(){
    const [sp, setSp] = useState([0,0]);
    const [dji, setDji] = useState([0,0]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        fetch(`https://atlasapi-4oe2.onrender.com/quote?ticker=spy`)
            .then(response => response.json())
            .then(data => {
                const formattedData = [data.change, data.price];
                setSp(formattedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        fetch(`https://atlasapi-4oe2.onrender.com/quote?ticker=dia`)
            .then(response => response.json())
            .then(data => {
                const formattedData = [data.change, data.price];
                setDji(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);


    if(loading){
        return (
            <div className={"flex items-center justify-center dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] h-[93svh] border-2"}>
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

    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-3 grid-rows-8 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-x-2 md:border-r-0 md:border-l-2 row-span-3"}>
                <div className={"flex flex-col"}>
                    <div className={"py-7 px-4 text-5xl border-b-2 dark:border-white border-black"}>Markets</div>
                    <Link to={"/Atlas/order/spy"}>
                        <div className={"p-2 border-b-2 border-black dark:border-white cursor-pointer"}>
                            <div className={"flex items-center space-x-2"}>
                                <div className={"text-2xl"}>S&P 500</div>
                                <div className={`text-${sp[0] < 0 ? 'red-700' : 'green-700'}`}>{sp[0].toFixed(2)}%</div>
                            </div>
                            <div className={"text-4xl"}>${Number(sp[1]).toFixed(2)}</div>
                        </div>
                    </Link>
                    <Link to={"/Atlas/order/dia"}>
                        <div className={"p-2 cursor-pointer"}>
                            <div className={"flex items-center space-x-2"}>
                                <div className={"text-2xl"}>Dow Jones</div>
                                <div className={`text-${dji[0] < 0 ? 'red-700' : 'green-700'}`}>{dji[0].toFixed(2)}%</div>
                            </div>
                            <div className={"text-4xl"}>${Number(dji[1]).toFixed(2)}</div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={"row-span-3 p-2 border-x-2 md:border-r-0"}>
                <div className={"flex justify-between"}>
                    <div className={"text-2xl"}>Top Gainers</div>
                </div>
                <Gainers/>
            </div>
            <div className={"row-span-3 p-2 border-x-2 md:border-r-0"}>
                <div className={"flex justify-between"}>
                    <div className={"text-2xl"}>Top Losers</div>
                </div>
                <Losers/>
            </div>
            <div className={"row-span-5 border-x-2 md:border-r-0"}>
                <div className={"flex justify-between mb-2  p-2"}>
                    <div className={"text-4xl"}>Insight</div>
                </div>
                <Insight/>
            </div>
            <div className={"row-span-5 p-2 border-x-2 md:border-r-0"}>
                <div className={"flex justify-between mb-2"}>
                    <div className={"text-4xl"}>Most traded</div>
                </div>
                <Traded/>
            </div>
            <div className={"row-span-5 border-x-2 md:border-r-0"}>
                <div className="flex flex-col">
                    <div className={"py-6 px-4 text-4xl border-b-2 border-black dark:border-white"}>Learn</div>
                    <a href={"https://www.investopedia.com/terms/s/spottrade.asp"}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black md:hover:bg-gray-200 dark:border-white dark:md:hover:bg-gray-900"}>
                            <div>Spot</div>
                            <div className={"text-sm"}>Direct buying and selling of stocks</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/c/crossmargining.asp#:~:text=Key%20Takeaways,across%20all%20of%20their%20accounts."}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black md:hover:bg-gray-200 dark:border-white dark:md:hover:bg-gray-900"}>
                            <div>Cross Margin</div>
                            <div className={"text-sm"}>Amplify profits with leverage in stocks</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/m/margin.asp"}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black md:hover:bg-gray-200 dark:border-white dark:md:hover:bg-gray-900"}>
                            <div>Isolated Margin</div>
                            <div className={"text-sm"}>Safer leverage usage in stock trading</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/g/grid-trading.asp#:~:text=Grid%20trading%20involves%20placing%20buy,orders%20below%20the%20set%20price."}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black md:hover:bg-gray-200 dark:border-white dark:md:hover:bg-gray-900"}>
                            <div>Grid Automated</div>
                            <div className={"text-sm"}>Automated stock trading using programmed algorithms</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}