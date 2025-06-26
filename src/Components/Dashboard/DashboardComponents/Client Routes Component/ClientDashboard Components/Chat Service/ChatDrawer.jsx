import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import PropTypes from 'prop-types';

function ChatDrawer({ onClose, worker }) {
   
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);

   const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const pusherRef = useRef(null);
    const channelRef = useRef(null);
    const presenceChannelRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        if (token && userId) {
            setCurrentUser({
                id: userId,
                token: token
            });
        } else {
            setError('User not authenticated');
            setIsLoading(false);
        }
    }, []);

    const loadMessages = async () => {
        try {
            const response = await axios.get(`/api/messages/${worker.worker_id}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

            const loadedMessages = Array.isArray(response?.data) ? response.data : [];
            setMessages(loadedMessages);
            return loadedMessages;
        } catch (error) {
            console.error('Error loading messages:', error);
            setError('Failed to load messages');
            setMessages([]);
            return [];
        }
    };


    useEffect(() => {
        if (!currentUser || !worker?.worker_id) return;

        const initializeChat = async () => {
            try {
                setIsLoading(true);
                await loadMessages();


                pusherRef.current = new Pusher('3381d7d311e6c0a37731', {
                    cluster: 'ap2',
                    forceTLS: true,
                    authEndpoint: '/broadcasting/auth',
                    auth: {
                        headers: {
                            'Authorization': `Bearer ${currentUser.token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }
                });


                channelRef.current = pusherRef.current.subscribe(`chat.${currentUser.id}`);


                channelRef.current.bind('message', (data) => {
                    if (!data || typeof data !== 'object') return;

                    const newMsg = {
                        id: data.id || `temp-${Date.now()}`,
                        text: data.message || '',
                        sender: data.sender_id?.toString() === currentUser.id.toString()
                            ? 'user'
                            : 'worker',
                        timestamp: data.timestamp || new Date().toISOString()
                    };

                    setMessages(prev => {
                        const currentMessages = Array.isArray(prev) ? prev : [];

                        if (!currentMessages.some(msg => msg.id === newMsg.id)) {
                            return [...currentMessages, newMsg];
                        }
                        return currentMessages;
                    });
                   
                });


                presenceChannelRef.current = pusherRef.current.subscribe(`chat.${worker.worker_id}`);

                presenceChannelRef.current.bind('pusher:subscription_succeeded', () => {
                    setIsOnline(true);
                });

                presenceChannelRef.current.bind('pusher:member_removed', () => {
                    setIsOnline(false);
                });


                channelRef.current.bind('client-typing', (data) => {
                    if (data?.userId !== currentUser.id) {
                        setIsTyping(true);
                    }
                });

                channelRef.current.bind('client-stop-typing', (data) => {
                    if (data?.userId !== currentUser.id) {
                        setIsTyping(false);
                    }
                });

            } catch (err) {
                console.error('Chat initialization error:', err);
                setError('Failed to initialize chat');
            } finally {
                setIsLoading(false);
            }
        };

        initializeChat();


        return () => {
            if (channelRef.current) {
                channelRef.current.unbind_all();
            }
            if (presenceChannelRef.current) {
                presenceChannelRef.current.unbind_all();
            }
            if (pusherRef.current) {
                pusherRef.current.disconnect();
            }
        };
    }, [currentUser, worker?.worker_id]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);


        clearTimeout(typingTimeoutRef.current);
        if (e.target.value && channelRef.current) {
            channelRef.current.trigger('client-typing', { userId: currentUser?.id });
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (channelRef.current) {
                channelRef.current.trigger('client-stop-typing', { userId: currentUser?.id });
            }
        }, 1000);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !currentUser || !worker?.worker_id || isSending) {
            return;
        }

        try {
            setIsSending(true);
            const response = await axios.post('http://127.0.0.1:8000/api/send-message', {
                message: newMessage,
                sender_id: currentUser.id,
                receiver_id: worker.worker_id
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

            if (response.data?.id) {
                setNewMessage('');
            } else {
                throw new Error('Message not saved');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error.response?.data?.message || 'Failed to send message');
            setTimeout(() => setError(null), 3000);
        } finally {
            setIsSending(false);
        }
    };


    const renderMessages = () => {
        if (!Array.isArray(messages)) return null;

        return messages.map((message) => (
            <div
                key={message.id || `msg-${message.timestamp}`}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
                <div
                    className={`inline-block p-2 rounded-lg max-w-xs break-words ${message.sender === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                        }`}
                >
                    {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}
                </div>
            </div>
        ));
    };

    return (
        <div className="fixed top-15 right-3 z-40 h-auto p-0 overflow-hidden bg-white w-80 shadow-xl rounded-lg border border-gray-200 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
                <div className="flex items-center">
                    {worker?.profile_image ? (
                        <img
                            src={worker.profile_image}
                            alt={worker.name}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center mr-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                    <div>
                        <h5 className="text-sm font-semibold">{worker?.name || 'Chat'}</h5>
                        <p className="text-xs text-indigo-100">
                            {isOnline ? 'Online' : 'Offline'}
                            {isTyping && ' • Typing...'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-indigo-200 hover:text-white rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
                {error && (
                    <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center text-gray-500 py-4">Loading messages...</div>
                ) : (messages?.length === 0 || !Array.isArray(messages)) ? (
                    <div className="text-center text-gray-500 py-4">
                        {worker?.name ? `Start your conversation with ${worker.name}` : 'Start a new conversation'}
                    </div>
                ) : (
                    renderMessages()
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || isSending}
                        className={`bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isSending ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSending ? (
                            'Sending...'
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

ChatDrawer.propTypes = {
    onClose: PropTypes.func.isRequired,
    worker: PropTypes.shape({
        worker_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string,
        profile_image: PropTypes.string,
    }),
};

ChatDrawer.defaultProps = {
    worker: {
        name: '',
        profile_image: null,
    },
};

export default ChatDrawer;