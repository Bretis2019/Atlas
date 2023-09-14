import {useEffect, useState} from "react";
import OpenPositions from "../Dashboard/OpenPositions";
import {calculateProfitLoss, commafy} from "../Dashboard/Dashboard";

export default function Order(props){
    const {ticker} = props;
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [open, setOpen] = useState([]);
    const [openEnhanced, setOpenEnhanced] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchData = () => {
            fetch(`https://atlasapi-4oe2.onrender.com/quote?ticker=${ticker}`)
                .then(response => response.json())
                .then(data => {
                    setPrice(data.price);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchData();

        const intervalId = setInterval(fetchData, 30000);

        return () => {
            clearInterval(intervalId);
        };
    }, [ticker]);

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
    }, []);

    useEffect(() => {
        calculateProfitLoss(open)
            .then((result) => {
                setOpenEnhanced(result.openPositions);
            })
            .catch((error) => {
                console.error(`Error calculating profit/loss: ${error.message}`);
            });
    }, [open]);

    function handleClick(event) {
        setLoading(true)
        const type = event.target.id;

        const raw = JSON.stringify({
            "ticker": ticker,
            "amount": count,
            "price": price,
            "type": type
        });

        fetch('https://atlasapi-4oe2.onrender.com/user/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: raw
        })
            .then(res => res.json())
            .then(data => {
                if(data.token && data.token.trim() !== ""){
                    localStorage.setItem('token', data.token);
                }
                setLoading(false);
                setSuccess(data.message);
            })
            .catch(err => console.log(err));

    }

    return (
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-4 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-1"}>
                <div className={"flex flex-col"}>
                    <div className={"py-7 px-4 text-5xl border-b-2 border-r-2 dark:border-white border-black"}>Order</div>
                </div>
                <div className={"p-2"}>
                    <div className={"flex justify-between items-center space-x-2"}>
                        <div className={"text-3xl"}>Cash</div>
                        <div className={'text-3xl'}>${commafy(balance.toFixed(2))}</div>
                    </div>
                </div>
            </div>
            <div className={"row-span-4 p-2 flex flex-col justify-center items-center"}>
                <div className="flex space-x-4">
                    <div className="custom-number-input h-10 w-32">
                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button onClick={() => count > 1 ?  setCount(prevState => prevState - 1) : null} data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input onChange={(e)=> e.target.value > 0 ? setCount(e.target.value) : null} value={count} type="number" className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700" name="custom-input-number" defaultValue={0} />
                            <button onClick={() => setCount(prevState => prevState + 1)} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                        </div>
                    </div>
                    {count > 1 ? <h1 className={"text-5xl"}>Shares</h1> : <h1 className={"pl-7 text-5xl"}>Share</h1>}
                </div>
                <h1 className={"text-5xl"}>of {ticker}</h1>
                <h1 className={"text-5xl"}>at ${price.toFixed(2)}</h1>
                {count > 1 ? <h1 className={"text-5xl"}>Total ${(price * count).toFixed(2)}</h1>: <div className={"h-12"}></div>}
                <div className={"flex space-x-4"}>
                    <button onClick={handleClick} id={"BUY"} className={"text-2xl px-4 py-2 cursor-pointer rounded-full border-2 dark:border-white bg-green-300 dark:bg-green-800 border-black md:hover:bg-green-900"}>{loading ? "Loading" : "Buy"}</button>
                    <button onClick={handleClick} id={"SELL"} className={"text-2xl px-4 py-2 cursor-pointer rounded-full border-2 dark:border-white bg-red-600 border-black md:hover:bg-red-700"}>{loading ? "Loading" : "Sell"}</button>
                </div>
                {success.length > 1? <h1 className={"text-5xl"}>{success}</h1> : <div></div>}
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
        </div>
    )
}