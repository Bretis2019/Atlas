export default function Dashboard(props){
    const {sp} = props
    return(
        <div className={"w-[82svw] max-h-[90svh] md:h-[93svh] grid grid-cols-3 grid-rows-8 divide-x-2 divide-y-2 divide-black"}>
            <div className={"border-t-2 border-black border-l-2 row-span-3"}>
                <div className={"flex flex-col"}>
                    <div className={"py-7 px-4 text-5xl border-b-2 border-black"}>My Dashboard</div>
                    <div className={"p-2 border-b-2 border-black"}>
                        <div className={"flex items-center space-x-2"}>
                            <div className={"text-2xl"}>S&P 500</div>
                            <div className={`text-${sp[0] < 0 ? 'red-700' : 'green-700'}`}>{sp[0]}%</div>
                        </div>
                        <div className={"text-4xl"}>${sp[1]}</div>
                    </div>
                    <div className={"p-2 border-b-2 border-black"}>
                        <div className={"flex items-center space-x-2"}>
                            <div className={"text-2xl"}>Portfolio</div>
                            <div className={`text-${sp[0] < 0 ? 'red-700' : 'green-700'}`}>{sp[0]}%</div>
                        </div>
                        <div className={"text-4xl"}>${sp[1]}</div>
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