import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchTotalSales = async () => {
    const { data } = await axios.get('https://ecomm-vis.onrender.com/api/shopify/total-sales');
    return data;
};

const TotalSalesChart = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['totalSales'],
        queryFn: fetchTotalSales
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const chartData = {
        labels: data.map(entry => entry._id),
        datasets: [
            {
                label: 'Total Sales',
                data: data.map(entry => entry.total),
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Amount ($)',
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default TotalSalesChart;
