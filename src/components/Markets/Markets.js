import Gainers from "./Gainers";
import Losers from "./Losers";
import Traded from "./Traded";
import {useEffect, useState} from "react";
import Insight from "./Insight";

export default function Markets(props){
    const [sp, setSp] = useState([0,0]);
    const [dji, setDji] = useState([0,0]);
    useEffect(()=>{
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[]);

    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-3 grid-rows-8 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"flex flex-col"}>
                    <div className={"py-7 px-4 text-5xl border-b-2 dark:border-white border-black"}>Markets</div>
                    <div className={"p-2 border-b-2 border-black dark:border-white"}>
                        <div className={"flex items-center space-x-2"}>
                            <div className={"text-2xl"}>S&P 500</div>
                            <div className={`text-${sp[0] < 0 ? 'red-700' : 'green-700'}`}>{sp[0].toFixed(2)}%</div>
                        </div>
                        <div className={"text-4xl"}>${Number(sp[1]).toFixed(2)}</div>
                    </div>
                    <div className={"p-2"}>
                        <div className={"flex items-center space-x-2"}>
                            <div className={"text-2xl"}>Dow Jones</div>
                            <div className={`text-${dji[0] < 0 ? 'red-700' : 'green-700'}`}>{dji[0].toFixed(2)}%</div>
                        </div>
                        <div className={"text-4xl"}>${Number(dji[1]).toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className={"row-span-3 p-2"}>
                <div className={"flex justify-between"}>
                    <div className={"text-2xl"}>Top Gainers</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <Gainers setStock={props.setStock}/>
            </div>
            <div className={"row-span-3 p-2"}>
                <div className={"flex justify-between"}>
                    <div className={"text-2xl"}>Top Losers</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <Losers setStock={props.setStock}/>
            </div>
            <div className={"row-span-5"}>
                <div className={"flex justify-between mb-2  p-2"}>
                    <div className={"text-4xl"}>Insight</div>
                </div>
                <Insight setStock={props.setStock}/>
            </div>
            <div className={" row-span-5 p-2"}>
                <div className={"flex justify-between mb-2"}>
                    <div className={"text-4xl"}>Most traded</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <Traded setStock={props.setStock}/>
            </div>
            <div className={" row-span-5"}>
                <div className="flex flex-col">
                    <div className={"py-6 px-4 text-4xl border-b-2 border-black dark:border-white"}>Learn</div>
                    <a href={"https://www.investopedia.com/terms/s/spottrade.asp"}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black hover:bg-gray-200 dark:border-white dark:hover:bg-gray-900"}>
                            <div>Spot</div>
                            <div className={"text-sm"}>Direct buying and selling of stocks</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/c/crossmargining.asp#:~:text=Key%20Takeaways,across%20all%20of%20their%20accounts."}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black hover:bg-gray-200 dark:border-white dark:hover:bg-gray-900"}>
                            <div>Cross Margin</div>
                            <div className={"text-sm"}>Amplify profits with leverage in stocks</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/m/margin.asp"}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black hover:bg-gray-200 dark:border-white dark:hover:bg-gray-900"}>
                            <div>Isolated Margin</div>
                            <div className={"text-sm"}>Safer leverage usage in stock trading</div>
                        </div>
                    </a>
                    <a href={"https://www.investopedia.com/terms/g/grid-trading.asp#:~:text=Grid%20trading%20involves%20placing%20buy,orders%20below%20the%20set%20price."}>
                        <div className={"cursor-pointer py-3 px-4 text-2xl border-b-2 border-black hover:bg-gray-200 dark:border-white dark:hover:bg-gray-900"}>
                            <div>Grid Automated</div>
                            <div className={"text-sm"}>Automated stock trading using programmed algorithms</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}