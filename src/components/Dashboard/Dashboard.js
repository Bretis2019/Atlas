import {useEffect, useState} from "react";

export default function Dashboard(){

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/description?ticker=AAPL')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[])

    return(
        <div className={"w-[82svw] max-h-[90svh] md:h-[93svh] grid grid-cols-3 grid-rows-8 divide-x-2 divide-y-2 divide-white text-white"}>
            <div className={"border-t-2 border-white border-l-2 row-span-3"}>
                <div className={"flex flex-col"}>
                    <div className="flex items-center justify-center px-4 py-2 border-b-2 border-white">
                        <img className={"max-h-[50px] max-w-[50px] rounded-md"} src={data.logo} alt={data.name + "logo"} loading="lazy"/>
                        <div className={"py-7 px-4 text-5xl "}>{data.name}</div>
                    </div>
                    <div className={"p-2 border-b-2 border-white flex"}>
                        <div className={"py-7 px-4 text-5xl "}>${data.price}</div>
                        <div className={"py-7 px-4 text-sm "}>
                            <div>${data.high}</div>
                            <div className={"relative left-16"}>${data.low}</div>
                        </div>
                    </div>
                    <div className={"p-2 border-b-2 border-white"}>

                    </div>
                </div>
            </div>
            <div className={"row-span-3 p-2"}>
            </div>
            <div className={" row-span-3 p-2"}>
            </div>
            <div className={" row-span-5 p-2"}>
            </div>
            <div className={" row-span-5 p-2"}>
            </div>
            <div className={" row-span-5"}>
            </div>
        </div>
    )
}