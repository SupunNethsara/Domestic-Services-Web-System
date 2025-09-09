import React from 'react'

function AskJobModal({ isOpen, onClose, request }) {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Create Post
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                       
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AskJobModal