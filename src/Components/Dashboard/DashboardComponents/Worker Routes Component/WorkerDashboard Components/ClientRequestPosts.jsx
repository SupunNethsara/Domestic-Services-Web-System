import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ClientRequestPosts() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/GetPost');
                setPostData(response.data.posts);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    if (error) return (
        <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center mt-4 mr-3">
            <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Error Loading Posts</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Try Again
            </button>
        </div>
    );

    return (
        <div className="w-full mx-auto">
            {postData && postData.length > 0 ? (
                postData.map(post => {
                    let parsedContent = {};
                    try {
                        parsedContent = typeof post.content === 'string'
                            ? JSON.parse(post.content)
                            : post.content;
                    } catch {
                        parsedContent = { content: post.content, image: post.image };
                    }

                    return (
                        <div key={post.id} className="mt-3 mr-2 bg-white rounded-xl overflow-hidden shadow-lg mb-6 border border-gray-100">
                            <div className="p-4 flex items-center justify-between border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img
                                            src={post.user?.profile?.profile_image || '/default-avatar.png'}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/48x48?text=U';
                                            }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-1.003-.21-1.96-.59-2.808A5 5 0 0010 11z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{post.user?.profile?.username || 'Unknown User'}</p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(post.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="mb-4">
                                    <p className="text-gray-700 leading-relaxed">{parsedContent.content}</p>
                                </div>

                                {parsedContent.image && (
                                    <div className="relative w-full h-80 bg-gray-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={parsedContent.image}
                                            alt="Post content"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                                            <p className="text-gray-400">Image not available</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="px-5 py-3 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors group">
                                            <div className="p-1 rounded-full group-hover:bg-red-50 transition-colors">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm ml-1">42</span>
                                        </button>
                                        <button className="flex items-center text-gray-500 hover:text-indigo-500 transition-colors group">
                                            <div className="p-1 rounded-full group-hover:bg-indigo-50 transition-colors">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm ml-1">12</span>
                                        </button>
                                        <button className="flex items-center text-gray-500 hover:text-green-500 transition-colors group">
                                            <div className="p-1 rounded-full group-hover:bg-green-50 transition-colors">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm ml-1">7</span>
                                        </button>
                                    </div>
                                    <button className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Ask about job
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="max-w-full mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-center mt-4">
                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Posts Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        This space is waiting for content. Check back later or be the first to share something!
                    </p>
                    <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        Refresh Page
                    </button>
                </div>
            )}
        </div>
    )
}