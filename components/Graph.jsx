import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import Chart from "chart.js/auto";
import Container from '@mui/material/Container';
import axios from 'axios';

Chart.register(CategoryScale);

const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const getData = async (base, sym, start_date, end_date) => {
    try {
        const { data } = await axios.get(`/api/getchartdata?sym=${sym}&base=${base}&start_date=${start_date}&end_date=${end_date}`)
        return data
    } catch (error) {
        console.log(error)
        return 0
    }

}
const Graph = ({ currency1 = 'INR', currency2 = 'USD' }) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchGraphData = async () => {
            const currentDate = new Date();
            const startDate = new Date();
            startDate.setFullYear(startDate.getFullYear() - 1);

            const formattedStartDate = formatDate(startDate.toISOString().split('T')[0]);
            const formattedEndDate = formatDate(currentDate.toISOString().split('T')[0]);

            const graphData = await getData(currency1, currency2, formattedStartDate, formattedEndDate);

            setData(graphData);
        };

        fetchGraphData();
        console.log(data)
    }, [currency1, currency2]);

    if (!data || !data.rates) {
        return <Container
            maxWidth="sm"
            style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
            Loading...
        </Container>;
    }

    const chartData = {
        labels: Object.keys(data.rates).map((date) => formatDate(date)),
        datasets: [
            {
                label: 'Exchange Rate for last one year',
                data: Object.values(data.rates).map((rate) => rate[currency2]),
                fill: true,
                backgroundColor: 'rgba(30, 94, 243, 0.4)',
                borderColor: 'rgb(30, 94, 243)',
                tension: 0.1,
                pointRadius: 0,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                display: false, // Hide x-axis label
            },
            y: {
                display: false
            }
        }
    };

    return (
        <Container sx={{ marginTop: '40px' }}>
            <Line data={chartData} options={chartOptions} />
        </Container>
    );
}

export default Graph