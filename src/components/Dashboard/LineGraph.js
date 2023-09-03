import Chart from "react-apexcharts";

const calculateChangeRate = (data) => {
    const changeRateData = [0]; // Initialize with 0 for the first data point
    for (let i = 1; i < data.length; i++) {
        const changeRate = ((data[i].balance - data[i - 1].balance) / data[i - 1].balance) * 100;
        changeRateData.push(changeRate);
    }
    return changeRateData;
};
const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function LineGraph(props){

    const {data1, data2} = props;
    const dates1 = data1.map(item => item.date);
    const changeRates1 = calculateChangeRate(data1);
    const changeRates2 = calculateChangeRate(data2);

    const options = {
        chart: {
            id: 'line-chart',
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
            },
            categories: dates1.slice(1), // Use dates1 or dates2 as the x-axis values, excluding the first date
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value.toFixed(2); // Limit to two decimal places
                },
                style: {
                    colors: isDarkMode() ? '#ffffff': '#000000',
                    fontFamily: 'Space Mono'
                }
            },
            tooltip: {
                enabled: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
    };


    const series = [
        {
            name: 'Portfolio',
            data: changeRates1, // Use changeRates1 for Series 1
        },
        {
            name: 'S&P 500',
            data: changeRates2, // Use changeRates2 for Series 2
        },
    ];

    return (
        <div className="line-chart">
            <Chart options={options} series={series} type="line" height={300} />
        </div>
    )
};