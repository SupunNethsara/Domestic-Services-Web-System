import React, { useState } from 'react';
import { RiMessage2Fill } from 'react-icons/ri';

const MessagesTabs = ({ messages: initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: 'client',
        time: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <RiMessage2Fill className="mr-2 text-indigo-600" />
        Messages
      </h2>

      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-xs ${message.sender === 'client' ? 'bg-indigo-100 ml-auto' : 'bg-white'}`}
            >
              <p className="text-gray-800">{message.text}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesTabs;