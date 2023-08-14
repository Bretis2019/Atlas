import {useEffect, useState} from "react";
import {getFirstWord} from "./Stock";
export default function MiniCard(props){
    const {ticker} = props;
    const [data, setData] = useState({
    logo: "",
    name: ""
    });

    useEffect(() =>{
        fetch(`https://atlasapi-4oe2.onrender.com/descriptionShort?ticker=${ticker}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[ticker])

    return(
        <div onClick={() => props.setStock(ticker)} className={"cursor-pointer hover:bg-gray-800 flex flex-col items-center justify-center px-4 py-2 border-2 dark:border-white border-black rounded-lg min-w-[250px] min-h-[80px] max-w-fit"}>
            <img className={"h-[50px] w-[50px] object-contain rounded-lg"}  src={getFirstWord(data.name) === "Meta" ? "https://logo.clearbit.com/https://www.meta.com" : data.logo} alt={data.name + "logo"} loading="lazy"/>
            <div>{getFirstWord(data.name)}</div>
        </div>
    )
}