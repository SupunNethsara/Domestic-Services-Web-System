import React, { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const MessageInput = ({
  initialMessage = '',
  recipientName = '',
  onSend,
  onClose,
  isSending = false,
  autoFocus = true
}) => {
  const [messageText, setMessageText] = useState(initialMessage);
  const inputRef = React.useRef(null);

useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    setMessageText(initialMessage);
  }, [initialMessage]);

  const handleSend = () => {
    if (messageText.trim() && !isSending) {
      onSend(messageText.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#4f47e6] border-t border-gray-200 shadow-xl p-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">
            {initialMessage ? 'Edit response to' : 'Message to'} {recipientName}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close message input"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={initialMessage || "Type your message here..."}
            className="flex-1 bg-white bg-opacity-90 border border-gray-300 rounded-lg px-4 py-2.5 
                      focus:outline-none focus:ring-2 focus:ring-white focus:border-white
                      placeholder-gray-500 text-gray-800"
            disabled={isSending}
          />
          
          <button
            onClick={handleSend}
            disabled={isSending || !messageText.trim()}
            className={`flex items-center justify-center min-w-[100px] px-4 py-2.5 rounded-lg
                      border-2 border-white text-white font-medium
                      ${isSending || !messageText.trim() 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white hover:text-purple-700 hover:bg-opacity-20 active:bg-opacity-30 transition-colors'}`}
            aria-label={isSending ? 'Sending message' : 'Send message'}
          >
            {isSending ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Sending
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Send
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;