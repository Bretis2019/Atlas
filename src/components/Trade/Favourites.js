import React from "react";
import SliderChart from "./SliderChart";

export default function Favourites(props) {
    const { data } = props;

    if (!data || data.length === 0) {
        return null;
    }

    const Elements = data.map((item) => {
        return (
            <div onClick={() =>  props.setStock(item.symbol)} className={"flex justify-between items-center cursor-pointer"} key={item.symbol}>
                <div>
                    <h1 className={"text-3xl"}>{item.symbol}</h1>
                    <h1 className={"text-gray-500"}>{item.name}</h1>
                </div>
                <div className={"flex"}>
                    <div>
                        <SliderChart
                            low={item.dayLow}
                            high={item.dayHigh}
                            current={item.price}
                            change={item.changesPercentage}
                        />
                    </div>
                    <div className={"w-[20svw] md:w-[7svw] text-end"}>
                        <h1
                            className={`md:text-3xl text-${
                                item.changesPercentage < 0 ? "red-700" : "green-700"
                            }`}
                        >
                            {Math.round(item.changesPercentage * 100) / 100}%
                        </h1>
                        <h1 className={"text-gray-500 text-end"}>${item.price}</h1>
                    </div>
                </div>
            </div>
        );
    });

    return <div className={"p-4 space-y-4"}>{Elements}</div>;
}
