import {useEffect, useState} from "react";
import OpenPositions from "./OpenPositions";
import Transactions from "./Transactions";
import BalanceHistory from "./BalanceHistory";


export function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export async function calculateProfitLoss(positions) {
    let openPositions = [];
    let totalPositionValue = 0;
    let totalProfitLoss = 0;

    // Iterate through each position in the array
    for (const position of positions) {
        const { ticker, amount, averagePrice } = position;

        try {
            // Fetch the current price for the ticker
            const response = await fetch(`https://atlasapi-4oe2.onrender.com/quote?ticker=${ticker}`);
            if (!response.ok) {
                console.log(`Failed to fetch data for ${ticker}`);
                continue; // Skip this position and continue with the next one
            }

            const data = await response.json();

            if (!data || typeof data.price !== 'number') {
                console.log(`Invalid data received for ${ticker}`);
                continue; // Skip this position and continue with the next one
            }

            const currentPrice = data.price;

            // Calculate profit or loss for this position
            const positionValue = amount * currentPrice;
            const costBasis = amount * averagePrice;
            const profitLoss = positionValue - costBasis;

            // Add this position's profit or loss to the position object
            const positionWithPnL = {
                ...position,
                profitLoss,
            };

            // Add this position's value to the total position value
            totalPositionValue += positionValue;

            // Add this position's profit or loss to the total profit/loss
            totalProfitLoss += profitLoss;

            // Add this position to the openPositions array
            openPositions.push(positionWithPnL);
        } catch (error) {
            console.error(`Error processing position for ${ticker}: ${error.message}`);
        }
    }

    return { openPositions, totalPositionValue, totalProfitLoss };
}

export default function Dashboard(){

    const [balance, setBalance] = useState(0);
    const [open, setOpen] = useState([]);
    const [openEnhanced, setOpenEnhanced] = useState([]);
    const [pl, setPl] = useState(0);
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('https://atlasapi-4oe2.onrender.com/user/open', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOpen(data);
                setLoading(false);
            })
            .catch(err => console.log(err));
        fetch('https://atlasapi-4oe2.onrender.com/user/balance/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBalance((data.slice(-1))[0].balance);
            })
            .catch(err => console.log(err));
        fetch('https://atlasapi-4oe2.onrender.com/user/balance', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        calculateProfitLoss(open)
            .then((result) => {
                setPl(result.totalProfitLoss);
                setValue(result.totalPositionValue);
                setOpenEnhanced(result.openPositions);
            })
            .catch((error) => {
                console.error(`Error calculating profit/loss: ${error.message}`);
            });
    }, [open]);

    if(loading){
        return (
            <div className={"flex items-center justify-center dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] h-[93svh] border-x-2 md:border-r-0"}>
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
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"flex flex-col"}>
                    <div className={"py-7 px-4 text-5xl border-b-2 dark:border-white border-black"}>Dashboard</div>
                    <div className={"p-2 border-b-2 border-black dark:border-white"}>
                        <div className={"flex justify-between items-center space-x-2"}>
                            <div className={"text-2xl"}>Equity</div>
                            <div className={'text-2xl'}>${commafy((value + balance).toFixed(2))}</div>
                        </div>
                    </div>
                    <div className={"p-2"}>
                        <div className={"flex justify-between items-center space-x-2"}>
                            <div className={"text-2xl"}>Cash</div>
                            <div className={'text-2xl'}>${commafy(balance.toFixed(2))}</div>
                        </div>
                    </div>
                    <div className={"p-2 border-t-2 border-black dark:border-white"}>
                        <div className={"flex justify-between items-center space-x-2"}>
                            <div className={"text-2xl"}>P&L</div>
                            <div className={`text-${pl < 0 ? 'red-700' : 'green-700'} text-2xl`}>${commafy(pl.toFixed(2))}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"row-span-3 col-span-2"}>
                <div className={"flex flex-col justify-between  p-2"}>
                    <div className={"py-5 px-2 text-3xl md:text-4xl"}>Recent transactions</div>
                    <div className={"flex justify-between items-center"}>
                        <h1>Ticker</h1>
                        <h1>Amount</h1>
                        <h1>Price</h1>
                        <h1>Type</h1>
                    </div>
                </div>
                <Transactions />
            </div>
            <div className={"row-span-5"}>
                <div className={"flex justify-between flex-col p-2"}>
                    <div className={"py-5 px-2 text-3xl md:text-4xl"}>Open positions</div>
                    <div className={"flex justify-between items-center"}>
                        <h1>Ticker</h1>
                        <h1>Average price</h1>
                        <h1>P&L</h1>
                        <h1>Amount</h1>
                    </div>
                </div>
                <OpenPositions array={openEnhanced}/>
            </div>
            <div className={"row-span-5 col-span-2 pb-8 md:pb-0"}>
                <div className={"flex justify-between"}>
                        <div className={"py-7 px-4 text-3xl md:text-4xl"}>Performance</div>
                </div>
                <BalanceHistory />
            </div>
        </div>
        )
}
