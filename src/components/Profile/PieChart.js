import {useEffect, useState} from "react";
import Chart from "react-apexcharts";

const isDarkMode = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function PieChart(){

    const [open, setOpen] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [values, setValues] = useState([]);

    useEffect(() => {
        fetch('https://atlasapi-4oe2.onrender.com/user/open', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOpen(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const labels = open.map(item => item.ticker);
        setValues(open.map(item => item.amount * item.averagePrice));

        setChartOptions({
            labels,
            responsive: [{
                breakpoint: 480,
            }],
            legend: {
                position: 'bottom',
                labels: {
                    colors: isDarkMode() ? '#ffffff': '#000000',
                    fontFamily: 'Space Mono'
                }
            }
        })
    }, [open]);


    return (
        <div>
            <Chart
                options={chartOptions}
                series={values}
                type="pie"
                width="400"
            />
        </div>
    )
}