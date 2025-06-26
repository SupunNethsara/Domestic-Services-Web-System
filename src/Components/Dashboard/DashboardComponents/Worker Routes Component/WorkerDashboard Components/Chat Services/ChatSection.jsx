import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiPaperclip, FiSearch, FiMoreVertical, FiMessageSquare, FiUser } from 'react-icons/fi';
import Echo from 'laravel-echo';

function ChatSection() {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const echo = useRef(null);

    useEffect(() => {
        echo.current = new Echo({
            broadcaster: 'pusher',
            key: '3381d7d311e6c0a37731',
            cluster: ' ap2',
            forceTLS: true,
            authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        });

        return () => {
            echo.current.disconnect();
        };
    }, []);

    
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/getAllClients', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (data.success) {
                    setClients(data.data);
                    if (data.data.length > 0) {
                        setSelectedClient(data.data[0]);
                    }
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching clients:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

   useEffect(() => {
        if (selectedClient) {
            fetchMessages(selectedClient.id);
            setupMessageListener(selectedClient.id);
        }
    }, [selectedClient]);

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessages = async (workerId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/messages/${workerId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const setupMessageListener = (workerId) => {
     
        echo.current.leave(`chat.user.${workerId}`);

     
        echo.current.private(`chat.user.${workerId}`)
            .listen('.message', (data) => {
                setMessages(prev => [...prev, {
                    id: data.id,
                    message: data.message,
                    sender_id: data.sender_id,
                    created_at: data.timestamp
                }]);
            });
    };

    const sendMessage = async () => {
        if (!message.trim() || !selectedClient) return;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    message: message,
                    receiver_id: selectedClient.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            setMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    const getAvatarUrl = (client) => {
        if (client.profile?.profile_image) {
            return client.profile.profile_image;
        }
        const name = client.profile?.first_name || client.email;
        return `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=random&color=fff&size=128`;
    };

    const filteredClients = clients.filter(client =>
        client.profile?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center text-red-500">Error: {error}</div>;
    }

    if (clients.length === 0) {
        return <div className="h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">No clients found</div>;
    }

    return (
        <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex overflow-hidden">
         
            <div className="w-80 border-r border-gray-200 bg-white/80 backdrop-blur-sm flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <FiMessageSquare className="mr-2 text-indigo-500" />
                        Messages
                    </h2>
                    <div className="mt-4 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredClients.map(client => (
                        <div
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            className={`flex items-center p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedClient?.id === client.id
                                    ? 'bg-indigo-50 border-l-4 border-l-indigo-500'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={getAvatarUrl(client)}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getAvatarUrl({
                                            ...client,
                                            profile: { ...client.profile, profile_image: null }
                                        });
                                    }}
                                />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${client.online ? 'bg-green-500' : 'bg-gray-300'
                                    }`}></div>
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                        {client.profile?.first_name || client.email.split('@')[0]}
                                    </h3>
                                    {client.unread > 0 && (
                                        <span className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {client.unread}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">
                                    {client.lastMessage || client.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            
            {selectedClient ? (
                <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm">
                    <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                        <div className="relative">
                            <img
                                src={getAvatarUrl(selectedClient)}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getAvatarUrl({
                                        ...selectedClient,
                                        profile: { ...selectedClient.profile, profile_image: null }
                                    });
                                }}
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${selectedClient.online ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900">
                                {selectedClient.profile?.first_name || selectedClient.email.split('@')[0]}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {selectedClient.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                        <div className="ml-auto flex space-x-2">
                            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition">
                                <FiMoreVertical />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-indigo-50/50">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender_id === selectedClient.id
                                            ? 'justify-start'
                                            : 'justify-end'
                                        }`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${msg.sender_id === selectedClient.id
                                                ? 'rounded-tl-none bg-white'
                                                : 'rounded-tr-none bg-indigo-500 text-white'
                                            } shadow-sm border border-gray-100`}
                                    >
                                        <p>{msg.message}</p>
                                        <p className={`text-xs mt-1 text-right ${msg.sender_id === selectedClient.id
                                                ? 'text-gray-400'
                                                : 'text-indigo-100'
                                            }`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center">
                            <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full transition">
                                <FiPaperclip />
                            </button>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                className="flex-1 mx-2 px-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!message.trim()}
                                className={`p-2 rounded-full transition ${message.trim()
                                        ? 'text-indigo-600 hover:text-indigo-700'
                                        : 'text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <FiSend />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-blue-50/50">
                    <div className="text-center p-8 max-w-md">
                        <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <FiUser className="text-indigo-500 text-2xl" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a client</h3>
                        <p className="text-gray-500">Choose a client from the sidebar to start chatting</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatSection;