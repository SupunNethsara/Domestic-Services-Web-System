import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUsers, FiBriefcase, FiFileText, FiStar, FiDollarSign } from 'react-icons/fi';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function StaticsDashboard() {
    const [stats, setStats] = useState({
        user_count: 0,
        client_count: 0,
        worker_count: 0,
        post_count: 0
    });

    const [topRatedServices, setTopRatedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const [statsRes, servicesRes, postsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/user-count', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://127.0.0.1:8000/api/getTopRatedServices', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://127.0.0.1:8000/api/GetPostCount', { headers: { Authorization: `Bearer ${token}` } })
                ]);

                if (statsRes.status === 200) {
                    setStats(prev => ({
                        ...prev,
                        user_count: statsRes.data.user_count || 0,
                        client_count: statsRes.data.client_count || 0,
                        worker_count: statsRes.data.worker_count || 0
                    }));
                }

                if (postsRes.status === 200 && postsRes.data.status === "success") {
                    setStats(prev => ({
                        ...prev,
                        post_count: postsRes.data.post_count || 0
                    }));
                }

                if (servicesRes.status === 200 && servicesRes.data.success) {
                    setTopRatedServices(servicesRes.data.top_rated_services || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (amount, currency = 'LKR') => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency,
            minimumFractionDigits: 0
        }).format(amount);
    };

    const userData = [
        { name: 'Total Users', value: stats.user_count, color: '#3B82F6' },
        { name: 'Clients', value: stats.client_count, color: '#10B981' },
        { name: 'Workers', value: stats.worker_count, color: '#F59E0B' },
        { name: 'Posts', value: stats.post_count, color: '#8B5CF6' }
    ];

    const userDistributionData = [
        { name: 'Clients', value: stats.client_count, color: '#10B981' },
        { name: 'Workers', value: stats.worker_count, color: '#F59E0B' },
        { name: 'Others', value: stats.user_count - stats.client_count - stats.worker_count, color: '#64748B' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back! Here's your analytics summary</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                    { icon: <FiUsers className="h-5 w-5" />, title: 'Total Users', value: stats.user_count, color: 'bg-blue-500' },
                    { icon: <FiUsers className="h-5 w-5" />, title: 'Clients', value: stats.client_count, color: 'bg-green-500' },
                    { icon: <FiBriefcase className="h-5 w-5" />, title: 'Workers', value: stats.worker_count, color: 'bg-yellow-500' },
                    { icon: <FiFileText className="h-5 w-5" />, title: 'Total Posts', value: stats.post_count, color: 'bg-purple-500' }
                ].map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                            <div className={`${card.color} p-3 rounded-lg text-white`}>
                                {card.icon}
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Analytics</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={userData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="value" 
                                        radius={[4, 4, 0, 0]}
                                    >
                                        {userData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {userDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value) => [value, 'Users']}
                                        contentStyle={{
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Legend 
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{ paddingTop: '20px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Top Services</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {topRatedServices.map((service, index) => (
                                <div key={index} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-yellow-50 p-2 rounded-lg text-yellow-500">
                                            <FiStar className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{service.name}</p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <FiDollarSign className="h-4 w-4 mr-1" />
                                                <span>{formatCurrency(service.rate, service.currency)}</span>
                                                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                                    {service.rate_type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Rates</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={topRatedServices}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false}
                                        tickFormatter={(value) => formatCurrency(value, 'LKR').replace('LKR', '').trim()}
                                    />
                                    <Tooltip 
                                        formatter={(value) => formatCurrency(value, 'LKR')}
                                        contentStyle={{
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="rate" 
                                        fill="#8884d8" 
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaticsDashboard;