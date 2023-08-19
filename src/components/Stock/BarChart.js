import Chart from "react-apexcharts";
const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
export default function BarChart(props){
    const {data} = props;

    const chartData = {
        options: {
            chart: {
                id: 'bar-chart',
                theme: isDarkMode() ?  'dark' : 'light',
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
                categories: data.map(item => item.date),
                labels: {
                    style: {
                        colors: isDarkMode() ? '#ffffff': '#000000',
                        fontFamily: 'Space Mono'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: isDarkMode() ? '#ffffff': '#000000',
                        fontFamily: 'Space Mono'
                    }
                }
            },
            legend: {
                labels: {
                    colors: isDarkMode() ? '#ffffff': '#000000',
                    fontFamily: 'Space Mono',
                }
            },
            tooltip: {
                theme: isDarkMode() ?  'dark' : 'light'
            },
        },
        series: [
            {
                name: 'Actual',
                data: data.map(item => item.actual),
            },
            {
                name: 'Estimate',
                data: data.map(item => item.estimate),
            },
        ],
    };

    return(
        <div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={280}
            />
        </div>
    )
}