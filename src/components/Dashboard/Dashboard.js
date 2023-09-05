import {useEffect, useState} from "react";
import OpenPositions from "./OpenPositions";
import Transactions from "./Transactions";
import BalanceHistory from "./BalanceHistory";


function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

async function calculateProfitLoss(positions) {
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

    useEffect(() => {
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
            <div className={"row-span-5 col-span-2"}>
                <div className={"flex justify-between"}>
                        <div className={"py-7 px-4 text-3xl md:text-4xl"}>Performance</div>
                </div>
                <BalanceHistory />
            </div>
        </div>
        )
}