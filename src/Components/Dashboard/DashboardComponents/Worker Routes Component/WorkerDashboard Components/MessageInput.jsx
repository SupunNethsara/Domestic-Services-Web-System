import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const MessageInput = ({
  initialMessage = '',
  recipientName,
  onSend,
  onClose,
  isSending = false
}) => {
  const [messageText, setMessageText] = useState(initialMessage);

  const handleSend = () => {
    onSend(messageText);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">
            {initialMessage ? 'Edit your response to' : 'Respond to'} {recipientName}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={initialMessage || "Type your response here..."}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={isSending || !messageText.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50 min-w-[100px] justify-center"
          >
            {isSending ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              <FaPaperPlane className="mr-2" />
            )}
            {isSending ? 'Sending' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;