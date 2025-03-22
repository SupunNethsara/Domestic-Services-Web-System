import React from 'react';
import { X, Image, Smile, Video } from 'lucide-react';

export default function MindDetailsModal({ onClose }) {
  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
 
        <div className="flex justify-between items-center border-b border-gray-300 pb-2">
          <h2 className="text-lg font-semibold">Create post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3">
          <textarea
            className="w-full border-none focus:ring-0 text-gray-700 placeholder-gray-500 resize-none"
            placeholder="What's on your mind?"
            rows="3"
          ></textarea>
        </div>

  
        <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-2">
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
              <Image className="w-5 h-5" />
              <span>Photo/Video</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500">
              <Smile className="w-5 h-5" />
              <span>Feeling</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
              <Video className="w-5 h-5" />
              <span>Live</span>
            </button>
          </div>
        </div>

        {/* Post button */}
        <div className="mt-3">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}