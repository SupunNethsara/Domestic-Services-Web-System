import React from 'react';
import { FiSend, FiSearch, FiMoreVertical, FiPaperclip, FiMic, FiSmile, FiChevronDown } from 'react-icons/fi';

function ChatSection() {

    const clients = [
        { id: 1, name: 'Alex Johnson', lastMessage: 'About the project timeline...', unread: 2, online: true, avatar: 'AJ' },
        { id: 2, name: 'Sarah Williams', lastMessage: 'I sent the documents', unread: 0, online: false, avatar: 'SW' },
        { id: 3, name: 'Emily Davis', lastMessage: 'Thanks for the update!', unread: 0, online: true, avatar: 'ED' },
        { id: 4, name: 'James Wilson', lastMessage: 'When can we meet?', unread: 3, online: false, avatar: 'JW' },
    ];

    const [selectedClient, setSelectedClient] = React.useState(clients[0]);
    const [message, setMessage] = React.useState('');

    return (
        <div className="h-5/6 bg-gray-50 flex">

            <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Clients</h2>
                        <button className="text-gray-500 hover:text-gray-700">
                            <FiChevronDown size={20} />
                        </button>
                    </div>
                    <div className="mt-4 relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clients"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            onClick={() => setSelectedClient(client)}
                            className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedClient.id === client.id ? 'bg-blue-50' : ''}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                    {client.avatar}
                                </div>
                                {client.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-sm font-medium text-gray-900">{client.name}</h3>
                                    {client.unread > 0 && (
                                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {client.unread}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">{client.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                            {selectedClient.avatar}
                        </div>
                        {selectedClient.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{selectedClient.name}</h3>
                        <p className="text-xs text-gray-500">
                            {selectedClient.online ? 'Online' : 'Offline'}
                        </p>
                    </div>
                    <button className="ml-auto text-gray-500 hover:text-gray-700">
                        <FiMoreVertical />
                    </button>
                </div>


                <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                    <div className="space-y-4">
                        <div className="flex justify-start">
                            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg rounded-tl-none bg-white shadow-sm">
                                <p className="text-gray-800">Hi there! I wanted to ask about the project timeline.</p>
                                <p className="text-xs text-gray-500 mt-1 text-right">10:30 AM</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg rounded-tr-none bg-blue-500 text-white shadow-sm">
                                <p>We're on track to finish by Friday as discussed.</p>
                                <p className="text-xs text-blue-100 mt-1 text-right">10:32 AM</p>
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg rounded-tl-none bg-white shadow-sm">
                                <p className="text-gray-800">That's great to hear! Thanks for the update.</p>
                                <p className="text-xs text-gray-500 mt-1 text-right">10:33 AM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <FiPaperclip />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <FiSmile />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                            className="flex-1 mx-2 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="text-gray-500 hover:text-gray-700 p-2">
                            <FiMic />
                        </button>
                        <button

                            disabled={!message}
                            className={`p-2 ml-2 ${message ? "text-blue-500 hover:text-blue-700" : "text-gray-300 cursor-not-allowed"}`}
                        >
                            <FiSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatSection;