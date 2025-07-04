import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function WorkerRequestPosts() {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/GetWorkerPost');
                setPostData(response.data.posts);
                setLoading(false);
                console.log("Posts fetched successfully:", response.data.posts);
            } catch (err) {
                console.error("Error fetching posts:", err.response?.data || err.message);
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div>
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
                        <div key={post.id} className="w-full bg-white rounded-lg overflow-hidden shadow-md mt-5 mr-3">
                            <div className="p-4 flex items-center justify-between border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={post.user?.profile?.profile_image}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">{post.user?.profile?.username}</p>
                                        <p className="text-gray-500 text-xs">
                                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Follow
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-4">
                                    <p className="font-md text-sm">{parsedContent.content}</p>
                                </div>

                                <div className="relative w-full h-96 bg-gray-100 mb-4 flex items-center justify-center">
                                    {parsedContent.image ? (
                                        <img
                                            src={parsedContent.image}
                                            alt="Post content"
                                            className="w-full h-full object-fit"
                                        />
                                    ) : (
                                        <p className="text-gray-500">Story content appears here</p>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-4">
                                        <button className="text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                        <button className="text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>
                                        <button className="text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center mt-3 space-x-2">
                                    <input type="text" placeholder="Add a comment..." className="flex-1 border-none focus:ring-0 text-sm" />
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-600">Post</button>
                                    <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-green-600">Connect</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center mt-4 mr-3">
                    <div className="flex justify-center mb-4">
                        <svg
                            className="w-12 h-12 text-indigo-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No Posts Yet
                    </h3>
                    <p className="text-gray-500">
                        This space is empty. Be the first to share something!
                    </p>
                </div>
            )}
        </div>
    )
}