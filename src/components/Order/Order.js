import {useEffect, useState} from "react";

export default function Order(props){
    const {ticker} = props;
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

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
                localStorage.setItem('token', data.token);
                setLoading(false);
                setSuccess(data.message);
            })
            .catch(err => console.log(err));

    }

    return (
        <div className={"w-[100svw] h-[93svh] md:w-[82svw] md:h-[93svh] md:border-l-2 border-t-2 dark:text-white flex flex-col items-center justify-center space-y-4 select-none"}>
            <h1 className={"text-5xl"}>Order</h1>
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
                <button onClick={handleClick} id={"BUY"} className={"text-2xl px-4 py-2 cursor-pointer rounded-full border-2 dark:border-white bg-green-800 border-black md:hover:bg-green-900"}>{loading ? "Loading" : "Buy"}</button>
                <button onClick={handleClick} id={"SELL"} className={"text-2xl px-4 py-2 cursor-pointer rounded-full border-2 dark:border-white bg-red-600 border-black md:hover:bg-red-700"}>{loading ? "Loading" : "Sell"}</button>
            </div>
            {success.length > 1? <h1 className={"text-5xl"}>{success}</h1> : <div></div>}
        </div>
    )
}