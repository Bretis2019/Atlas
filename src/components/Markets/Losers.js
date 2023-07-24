import StockChart from "./StockChart";

export default function Losers(props){
    const array = props.array;
    const Elements =  array.slice(0,3).map(item => {
        const formattedPrice = parseFloat(item.price).toFixed(2);
        const formattedPercentage = parseFloat(item.change_percentage).toFixed(2);
        return(
            <div className={"flex items-center justify-between space-y-4"}>
                <div className={"text-xl font-bold"}>{item.ticker}</div>
                <div><StockChart name={item.ticker} api={"ewPyg4Yls9MCdGJbWO01WB6imQdmQNLj"}/></div>
                <div className={"flex flex-col text-end"}>
                    <div className={"text-red-700 text-xl"}>{formattedPercentage}%</div>
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