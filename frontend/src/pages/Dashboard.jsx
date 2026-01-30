import React, { useEffect, useState } from 'react';
import { fetchSummary, fetchByCategory, fetchBySeverity, fetchTimeSeries } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = () => {
    const [summary, setSummary] = useState(0);
    const [catData, setCatData] = useState([]);
    const [sevData, setSevData] = useState([]);
    const [timeData, setTimeData] = useState([]);

    useEffect(() => {
        fetchSummary().then(res => setSummary(res.data.total_incidents));
        fetchByCategory().then(res => setCatData(res.data));
        fetchBySeverity().then(res => setSevData(res.data));
        fetchTimeSeries().then(res => setTimeData(res.data));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Incident Analytics Dashboard</h1>
            
            {/* Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-64 border-l-4 border-blue-500">
                <h3 className="text-gray-500">Total Incidents</h3>
                <p className="text-4xl font-bold">{summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Incidents by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={catData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Severity Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Severity Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={sevData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {sevData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Time Series Chart */}
                <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Incidents Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={timeData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#82ca9d" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;