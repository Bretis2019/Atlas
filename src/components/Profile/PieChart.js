import Chart from "react-apexcharts";


function isBigScreen() {
    return window.innerWidth >= 768;
}

const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function PieChart(props){

    const {open} = props;
    const labels = open.map(item => item.ticker);
    const values = open.map(item => item.amount * item.averagePrice.toFixed(0));

    const chartOptions = {
        labels,
        series: values,
        options: {
            chart: {
                fontFamily: 'Space Mono',
                type: 'pie',
            },
            responsive: [{
                breakpoint: 480,
            }]
        },
        legend: {
            fontFamily: 'Space Mono',
            position: 'bottom',
            labels: {
                colors: isDarkMode() ? '#ffffff': '#000000',
                fontFamily: 'Space Mono'
            }
        }
    };


    return (
        <div className={"py-8 px-4"}>
            <Chart options={chartOptions} series={values} type="pie" width={isBigScreen() ? "500" : "400"} />
        </div>
    )
}