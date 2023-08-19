import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
export default function StockChart(props) {
    const [series, setSeries] = useState([]);
    const [color, setColor] = useState('rgb(21, 128, 61)')
    const ticker = props.name;
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];

    useEffect(() => {
        fetch(`https://atlasapi-4oe2.onrender.com/history?ticker=${ticker}&from=${fromDate}&to=${toDate}&interval=1d`)
            .then(response => response.json())
            .then(data => {
                const elements = data.map(item => {
                    return (
                        item.close.toFixed(2)
                    )
                });
                if(elements[0] > elements[elements.length - 1]){setColor('rgb(185, 28, 28)')}
                setSeries(elements);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [ticker]);

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
