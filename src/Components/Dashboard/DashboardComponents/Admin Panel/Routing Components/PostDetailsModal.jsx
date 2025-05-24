import React from 'react';

function PostDetailsModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) {
    return null;
  }

  return (
    <div style={{backgroundColor:'rgba(0,0,0,0.5)'}} className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Post Details</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500 text-left">
              <strong>ID:</strong> {post.id}
            </p>
            <p className="text-sm text-gray-500 text-left mt-2">
              <strong>Content:</strong>
            </p>
            <p className="text-sm text-gray-700 text-left whitespace-pre-wrap mb-4">
              {post.content}
            </p>
            
            {post.image && (
              <div className="mt-4">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-auto max-h-96 object-contain rounded-md border border-gray-200"
                />
              </div>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsModal;