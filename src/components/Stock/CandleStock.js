import {useEffect, useState} from "react";
import Chart from "react-apexcharts";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDates() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    const fiveYearAgo = new Date(today);
    fiveYearAgo.setFullYear(today.getFullYear() - 5);

    const todayFormatted = formatDate(today);
    const yesterdayFormatted = formatDate(yesterday);
    const sevenDaysAgoFormatted = formatDate(sevenDaysAgo);
    const oneMonthAgoFormatted = formatDate(oneMonthAgo);
    const oneYearAgoFormatted = formatDate(oneYearAgo);
    const fiveYearAgoFormatted = formatDate(fiveYearAgo);

    return {
        today: todayFormatted,
        yesterday: yesterdayFormatted,
        sevenDaysAgo: sevenDaysAgoFormatted,
        oneMonthAgo: oneMonthAgoFormatted,
        oneYearAgo: oneYearAgoFormatted,
        fiveYearAgo: fiveYearAgoFormatted
    };
}

const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function CandleStock(props){

    const {ticker, span} = props;

    const [series, setSeries] = useState([]);

    const dates = getDates();

    const to = dates.today;

    let interval = "1h";

    let from = dates.yesterday;


    switch (span) {
        case "hour":
            interval = "15m";
            from = dates.yesterday;
            break;
        case "day":
            interval = "1h";
            from = dates.yesterday;
            break;
        case "week":
            interval = "1d";
            from = dates.sevenDaysAgo;
            break;
        case "month":
            interval = "1d";
            from = dates.oneMonthAgo;
            break;
        case "year":
            interval = "1wk";
            from = dates.oneYearAgo;
            break;
        case "all":
            interval = "1mo";
            from = dates.fiveYearAgo;
            break;
        default:
            interval = "30m";
            from = dates.yesterday;
            break;
    }

    useEffect(() => {
        fetch(`https://atlasapi-4oe2.onrender.com/history?ticker=${ticker}&from=${from}&to=${to}&interval=${interval}`)
            .then(response => response.json())
            .then(data => {
                const elements = data.map(item => {
                    return (
                        [Date.parse(item.date),item.open.toFixed(2),item.high.toFixed(2),item.low.toFixed(2),item.close.toFixed(2)]
                    )
                });
                setSeries(elements);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [interval,from,ticker,to]);

    const options = {
        chart: {
            fontFamily: 'Space Mono',
            type: 'candlestick',
            height: 350,
            theme: 'dark',
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 800
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: isDarkMode() ? '#ffffff': '#000000',
                    fontFamily: 'Space Mono'
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    colors: isDarkMode() ? '#ffffff': '#000000',
                    fontFamily: 'Space Mono'
                }
            }
        },
        tooltip: {
            theme: isDarkMode() ?  'dark' : 'light'
        },

    };


    if(series.length === 0){
        return (
            <div className={"h-[365px] flex items-center justify-center"}>
                <h1 className={"text-4xl text-black dark:text-white"}>The markets were closed</h1>
            </div>
        )
    }

    return (
        <Chart options={options} series={[{ data: series }]} type="candlestick" height={350} />
    );
}