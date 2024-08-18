import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const fetchNewCustomers = async () => {
    const { data } = await axios.get('https://ecomm-vis.onrender.com/api/shopify/new-customers');
    return data;
};

const NewCustomersChart = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['newCustomers'],
        queryFn: fetchNewCustomers
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const safeData = Array.isArray(data) ? data : [];

    const chartData = {
        labels: safeData.map(entry => {
            const date = new Date(entry._id);
            return date.toLocaleDateString();
        }),
        datasets: [
            {
                label: 'New Customers',
                data: safeData.map(entry => {
                    if (typeof entry.count === 'number') {
                        return entry.count;
                    }
                    return 0;
                }),
                backgroundColor: 'rgba(54,162,235,1)',
                borderColor: 'rgba(54,162,235,1)',
                borderWidth: 1,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(54,162,235,1)',
                pointBorderColor: 'rgba(54,162,235,1)',
                pointBorderWidth: 1,
            },
        ],
    };


    return <Line data={chartData} />;
};

export default NewCustomersChart;
