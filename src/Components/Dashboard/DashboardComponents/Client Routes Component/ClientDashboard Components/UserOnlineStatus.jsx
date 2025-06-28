import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../../Context/Authcontext';
import axios from 'axios';
import Echo from 'laravel-echo';

function UserOnlineStatus() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connectionState, setConnectionState] = useState('disconnected');
    const echoRef = useRef(null);
    const { user } = useAuth() || {};

    useEffect(() => {
        if (echoRef.current) return;

        console.log('Initializing Echo connection...');
        const echo = new Echo({
            broadcaster: 'pusher',
            key: '3381d7d311e6c0a37731',
            cluster: 'ap2',
            forceTLS: true,
            authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            },
            enabledTransports: ['ws', 'wss']
        });

        const pusher = echo.connector.pusher;

        pusher.connection.bind('connecting', () => {
            console.log('Pusher connecting...');
            setConnectionState('connecting');
        });

        pusher.connection.bind('connected', () => {
            console.log('Pusher connected successfully');
            setConnectionState('connected');
        });

        pusher.connection.bind('disconnected', () => {
            console.log('Pusher disconnected');
            setConnectionState('disconnected');
        });

        pusher.connection.bind('failed', () => {
            console.log('Pusher connection failed');
            setConnectionState('failed');
        });

        pusher.connection.bind('error', (error) => {
            console.error('Pusher connection error:', error);
            setConnectionState(`error: ${error.message}`);
        });

        echoRef.current = echo;

        return () => {
            console.log('Component unmounting - cleaning up Echo');
            if (echoRef.current) {
                try {
                    if (echoRef.current.connector.pusher.connection.state === 'connected') {
                        echoRef.current.leave('user-status');
                        echoRef.current.disconnect();
                    }
                } catch (e) {
                    console.log('Error during cleanup:', e);
                }
                echoRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        const fetchOnlineUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/api/online-users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                console.log('Fetched online users:', response.data);
                setOnlineUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch online users:', err);
                setError(err.response?.data?.message || 'Failed to load online users');
                setLoading(false);
            }
        };

        fetchOnlineUsers();

        if (!echoRef.current) return;

        const channel = echoRef.current.channel('user-status');

        channel.listen('.user.status.updated', (data) => {
            console.log('Received status update event:', data);
            setOnlineUsers(prevUsers => {

                const updatedUser = {
                    id: data.user.id,
                    name: data.user.name,
                    status: data.status,
                    last_seen: data.last_seen,
                    is_current: data.user.id === user?.id
                };

                const existingIndex = prevUsers.findIndex(u => u.id === data.user.id);

                if (existingIndex >= 0) {
               const newUsers = [...prevUsers];
                    newUsers[existingIndex] = updatedUser;
                    return newUsers;
                } else {
                     return [...prevUsers, updatedUser];
                }
            });
        });

        return () => {
            if (echoRef.current) {
                try {
                    echoRef.current.leave('user-status');
                } catch (e) {
                    console.log('Error leaving channel:', e);
                }
            }
        };
    }, [user]);

  
    const getConnectionStatusColor = () => {
        switch (connectionState) {
            case 'connected': return 'bg-green-500';
            case 'failed':
            case 'error': return 'bg-red-500';
            case 'connecting': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusIndicator = (status) => {
        const baseClasses = "inline-block w-3 h-3 rounded-full";
        switch (status) {
            case 'online': return `${baseClasses} bg-green-500`;
            case 'away': return `${baseClasses} bg-yellow-500`;
            default: return `${baseClasses} bg-gray-400`;
        }
    };

    if (loading) return (
        <div className="p-4 bg-white rounded-lg shadow mt-5">
            <div className="animate-pulse space-y-3">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-white rounded-lg shadow text-red-500">
            {error}
            <button
                onClick={() => window.location.reload()}
                className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm"
            >
                Retry
            </button>
        </div>
    );

    if (!user) return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center mt-5">
            <div className="flex justify-center mb-3">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Login Required</h3>
            <p className="text-gray-500 text-sm">Sign in to view online users.</p>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4 mt-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Online Users</h3>
                <div className="flex items-center space-x-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${getConnectionStatusColor()}`}
                        title={`Connection: ${connectionState}`}></span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {onlineUsers.filter(u => u.status === 'online').length} online
                    </span>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {onlineUsers.length === 0 ? (
                    <p className="text-gray-500 text-center py-2">No other users online</p>
                ) : (
                    onlineUsers.map(onlineUser => (
                        <div key={onlineUser.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center space-x-2">
                                <span className={getStatusIndicator(onlineUser.status)}
                                    title={onlineUser.status}></span>
                                <span className="text-xs">
                                    {onlineUser.name || `User ${onlineUser.id}`}
                                    {onlineUser.is_current && (
                                        <span className="text-xs text-gray-500 ml-1">(You)</span>
                                    )}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">
                                {onlineUser.status === 'online' ? (
                                    <span className="text-green-500">Online</span>
                                ) : (
                                    <span>Last seen {new Date(onlineUser.last_seen).toLocaleTimeString()}</span>
                                )}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserOnlineStatus;