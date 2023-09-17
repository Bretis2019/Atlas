import {useEffect, useState} from "react";

export default function Transactions(props){

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch('https://atlasapi-4oe2.onrender.com/user/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setTransactions(data);
            })
            .catch(err => console.log(err));
    }, []);

    const elements = transactions.map(item => {
        return (
            <div key={item._id} className={"flex justify-between cursor-pointer"} onClick={() =>  props.setStock(item.ticker)}>
                <h1>{item.ticker}</h1>
                <h1>{item.amount}x</h1>
                <h1>${item.price}</h1>
                <h1>{item.type}</h1>
            </div>
        )
    })

    return (
        <div className={"flex flex-col border-t-2 p-2 max-h-[300px] md:max-h-[120px] overflow-y-scroll no-scrollbar space-y-8"}>
            {elements.length < 1 ? <p className={"text-center text-2xl"}>No transactions</p> : elements}
        </div>
    )
}