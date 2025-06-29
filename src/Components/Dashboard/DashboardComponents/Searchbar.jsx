import React from "react";
export default function Searchbar({ onInputClick, profile }) {

    return (
        <div className="w-full bg-white rounded-lg shadow p-4">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    {profile?.profile_image ? (
                        <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v1.5h-16.031v-1.5q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="mb-3">
                        <input
                            onClick={onInputClick}
                            type="text"
                            className="w-full bg-[#f0f2f5]   rounded-full px-4 py-2 text-gray-700 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            placeholder={`What's on your mind, ${profile?.first_name || 'User'}?`}
                        />
                    </div>

                    <div className="flex justify-between border-t border-gray-100 pt-3">
                        <button className="flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg flex-1">
                            <span className="text-red-500">🎥</span>
                            <span className="text-sm font-medium">Live Video</span>
                        </button>

                        <button className="flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg flex-1">
                            <span className="text-green-500">🖼️</span>
                            <span className="text-sm font-medium">Photo/Video</span>
                        </button>

                        <button className="flex items-center justify-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg flex-1">
                            <span className="text-yellow-500">😊</span>
                            <span className="text-sm font-medium">Feeling/Activity</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}