import Chart from "react-apexcharts";

export default function SemiCircleGauge(props) {
    const { low, current, high, change } = props;

    const color = change > 0 ? 'rgb(21, 128, 61)' : 'rgb(185, 28, 28)';

    const percentage = ((current - low) / (high - low)) * 100;

    const chartOptions = {
        series: [percentage],
        chart: {
            type: 'radialBar',
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5,
                },
                dataLabels: {
                    show: false
                }
            }
        },
        fill: {
            colors: [color],
            type: 'solid',
        },
    };


    return (
        <Chart options={chartOptions} series={chartOptions.series} type="radialBar" height={80} />
    );
}
