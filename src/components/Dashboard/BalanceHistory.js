import {useEffect, useState} from "react";
import LineGraph from "./LineGraph";

function formatDateToYYYYMMDD(dateString) {
    if (dateString === "Final") {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1 and pad with 0 if needed.
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1 and pad with 0 if needed.
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

export default function BalanceHistory(){

    const [data, setData] = useState([]);
    const [sp, setSp] = useState([]);

    useEffect(() => {
        fetch('https://atlasapi-4oe2.onrender.com/user/balance/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const elements = data.map(item => {
                    return (
                        {
                            date: formatDateToYYYYMMDD(item.date),
                            balance : item.balance.toFixed(2)
                        }
                    )
                });
                setData(elements);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`https://atlasapi-4oe2.onrender.com/history?ticker=spy&from=${formatDateToYYYYMMDD(data[0].date)}&to=${formatDateToYYYYMMDD("Final")}&interval=1d`)
            .then(response => response.json())
            .then(data => {
                const elements = data.map(item => {
                    return (
                        {
                            date: formatDateToYYYYMMDD(item.date),
                            balance : item.close.toFixed(2)
                        }
                    )
                });
                setSp(elements)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [data]);


    return (
        <div>
            {(data.length > 0 && sp.length > 0) && <LineGraph data1={data} data2={sp} />}
        </div>
    )
}