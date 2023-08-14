import StockChart from "./StockChart";

export default function Gainers(props){
    const array = props.array;
    const Elements =  array.slice(0,3).map(item => {
        const formattedPrice = parseFloat(item.price).toFixed(2);
        const formattedPercentage = parseFloat(item.change_percentage).toFixed(2);
        return(
            <div onClick={() =>  props.setStock(item.ticker)} className={"flex items-center justify-between space-y-4 cursor-pointer"}>
                <div className={"text-xl font-bold"}>{item.ticker}</div>
                <div><StockChart name={item.ticker} api={"fXQ59JJPqcXxBbCtmjI_3lIS2t9Czyb_"}/></div>
                <div className={"flex flex-col text-end"}>
                    <div className={"text-green-700 text-xl"}>{formattedPercentage}%</div>
                    <div>${formattedPrice}</div>
                </div>
            </div>
        )
    })
    return(
        <div className={"flex flex-col space-y-3"}>
            {Elements}
        </div>
    )
}