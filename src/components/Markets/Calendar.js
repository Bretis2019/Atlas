import {Link} from "react-router-dom";

export default function Calendar(props){
    const Elements = props.calendar.map(item => {
        // Check if item.estimate is not empty or zero
        const hasEstimate = item.estimate !== '' && item.estimate !== 0;

        // Determine the color based on item.estimate value
        const textColor = item.estimate > 0 ? 'text-green-700' : 'text-red-700';

        return (
            <Link to={`Atlas/stock/${item.symbol}`}>
                <div className={"flex justify-between my-4 cursor-pointer"}>
                    <div className="text-xl">{item.symbol}</div>

                    {/* Conditional rendering for estimate */}
                    <div className={"text-xl"}>
                        {hasEstimate ? (
                            <div className={`text-xl ${textColor}`}>
                                ${item.estimate}
                            </div>
                        ) : (
                            <div className="text-xl">
                                {item.estimate}
                            </div>
                        )}
                    </div>

                    <div className={"text-xl "}>{item.reportDate}</div>
                </div>
            </Link>
        );
    });

    return(
            <div className={"h-[340px] overflow-y-scroll flex flex-col pr-2"}>
            {Elements}
        </div>
    )
}