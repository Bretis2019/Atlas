export default function OpenPositions(props){

    const elements = props.array.map(item => (
            <div className={"flex justify-between items-center px-2"} key={item.ticker}>
                <h1>{item.ticker}</h1>
                <h1>${item.averagePrice}</h1>
                <h1>{item.amount}x</h1>
            </div>
        ))

    return (
        <div className={"flex flex-col overflow-y-scroll no-scrollbar max-h-[300px] md:h-[460px] border-t-2 pt-4 space-y-8"}>
            {elements === null ? <p className={"text-center text-2xl"}>No open positions</p> : elements}
        </div>
    );
}