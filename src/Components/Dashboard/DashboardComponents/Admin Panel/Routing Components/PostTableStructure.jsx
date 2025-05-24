import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostDetailsModal from './PostDetailsModal'; 

function PostTableStructure() {
    const [postdata, setPostadata] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null); 
    };

    const getPostData = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/allposts');
        console.log(response.data);
        setPostadata(response.data.posts);
        setFilteredPosts(response.data.posts); // Initialize filtered posts with all posts
    }

    useEffect(() => {
        getPostData();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPosts(postdata);
        } else {
            const lowerSearchTerm = searchTerm.toLowerCase();
            const filtered = postdata.filter(post => {
                const profile = post.user.profile;
                if (!profile) return false;

                const fullName = ((profile.first_name || '') + ' ' + (profile.last_name || '')).toLowerCase();
                const email = (post.user.email || '').toLowerCase();
                const username = (profile.username || '').toLowerCase();

                return (
                    fullName.includes(lowerSearchTerm) || 
                    email.includes(lowerSearchTerm) ||
                    username.includes(lowerSearchTerm)
                );
            });
            setFilteredPosts(filtered);
        }
    }, [searchTerm, postdata]);

    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="relative my-4 w-full md:w-1/3">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, username or email..."
                                className="p-3 pl-10 w-full border-0 rounded-lg 
                                bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 
                                text-gray-700 placeholder-gray-400 
                                transition-all duration-200 
                                shadow-sm hover:shadow-md focus:shadow-lg
                                outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Select post</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredPosts && filteredPosts.map((post) => (
                                        <tr key={post.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={post.user.profile.profile_image} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{post.user.profile.username}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {post.user.profile.first_name} {post.user.profile.last_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{post.user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => handleOpenModal(post)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Select
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <PostDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                post={selectedPost}
            />
        </div>
    )
}

export default PostTableStructure