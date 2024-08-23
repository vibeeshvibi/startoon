import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LoginStats() {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    });
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoginStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/login-stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch login stats');
                }
                const stats = await response.json();

                console.log('Fetched stats:', stats); // Log fetched data

                if (Array.isArray(stats) && stats.length > 0) {
                    const labels = stats.map(stat => {
                        const month = stat._id.month.toString().padStart(2, '0'); // Ensure month is two digits
                        const year = stat._id.year;
                        return `${month}-${year}`;
                    });

                    const counts = stats.map(stat => stat.count);
                    const total = counts.reduce((acc, count) => acc + count, 0);

                    console.log('Labels:', labels); // Log labels
                    console.log('Counts:', counts); // Log counts

                    setData({
                        labels,
                        datasets: [
                            {
                                label: 'Login Count',
                                data: counts,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                    setTotalCount(total);
                } else {
                    setData({
                        labels: [],
                        datasets: []
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLoginStats();
    }, []);

    const handleLogout = () => {
        alert('Logging out!');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleDashboardNavigation = () => {
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Login Statistics</h2>
                    <div className="space-x-4">
                        <button
                            onClick={handleDashboardNavigation}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Login Count: {totalCount}</h3>
                <div className="w-full">
                    <Bar
                        data={data}
                        options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Login Count per Month and Year',
                                    padding: {
                                        top: 10,
                                        bottom: 30
                                    }
                                },
                                legend: {
                                    display: true,
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const label = context.dataset.label || '';
                                            const value = context.raw || 0;
                                            return `${label}: ${value}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Month-Year',
                                    },
                                    stacked: true,
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Login Count',
                                    },
                                    stacked: true,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default LoginStats;
