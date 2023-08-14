import Chart from "react-apexcharts";

export default function BarChart(props){
    const {data} = props;

    const chartData = {
        options: {
            chart: {
                id: 'bar-chart',
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
                categories: data.map(item => item.date),
                labels: {
                    style: {
                        colors: '#ffffff',
                        fontFamily: 'Space Mono'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#ffffff',
                        fontFamily: 'Space Mono'
                    }
                }
            },
            legend: {
                labels: {
                    colors: '#ffffff',
                    fontFamily: 'Space Mono',
                }
            },
            tooltip: {
                theme: 'dark',
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