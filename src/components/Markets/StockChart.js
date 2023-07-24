import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
export default function StockChart(props) {
    const [series, setSeries] = useState([]);
    const [color, setColor] = useState('rgb(21, 128, 61)')

    const apiKey = props.api;
    const ticker = props.name.replace(/[^a-zA-Z]/g, "");
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];

    useEffect(() => {
        function treatData(data){
            const historicalPrices = data.results.map(result => result.c);
            if(historicalPrices[0] - historicalPrices[historicalPrices.length - 1] >= 0){setColor('rgb(185, 28, 28)')}
            setSeries(historicalPrices);
        }
            fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?apiKey=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    treatData(data);
                })
                .catch(error => {
                    console.log(`Error fetching data: ${props.name}`, error);
                });
    }, []);

    const options = {
        chart: {
            id: 'stock-chart',
            type: 'line',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: [color],
        markers: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        grid: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
    };

    return(
        <div className={'h-[54px] w-[100px]'}>
            <Chart options={options} series={[{ data: series }]} type="line" height={50} width={100}/>
        </div>
    )
}
