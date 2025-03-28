import React, { useState } from 'react';
import axios from 'axios';

export default function MakePostModal({ postmodal, closemodal}) {
    const [formData, setFormData] = useState({
        description: '',
        cover_image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coverImageError, setCoverImageError] = useState(false);
    const [selectedCoverFile, setSelectedCoverFile] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          
            if (file.size > 10 * 1024 * 1024) {
                setError('File size exceeds 10MB limit');
                return;
            }
            
            setSelectedCoverFile(file);
            setCoverImageError(false);
            setError(null);
            setFormData(prev => ({
                ...prev,
                cover_image: URL.createObjectURL(file)
            }));
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'profile_preset');

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dx7waof09/image/upload`,
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.description.trim()) {
            setError('Please enter a description');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
          
            let coverUrl = null;
            if (selectedCoverFile) {
                coverUrl = await uploadImageToCloudinary(selectedCoverFile);
            }

            const postData = {
                content: formData.description,
                image: coverUrl
            };
            
            
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

       
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

           
            const response = await axios.post(
                'https://your-api-endpoint.com/posts',
                postData,
                config
            );

          
            if (onPostCreated) {
                onPostCreated(response.data);
            }

        
            closemodal();
            setFormData({
                description: '',
                cover_image: null
            });
            setSelectedCoverFile(null);

        } catch (err) {
            console.error("Post creation error:", err);
            setError(err.response?.data?.message || 
                   err.message || 
                   'Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!postmodal) return null;

    return (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
          
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Create Post
                    </h3>
                    <button
                        onClick={closemodal}
                        className="text-gray-400 hover:text-gray-500"
                        disabled={isSubmitting}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
          
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3 m-5">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Image
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {formData.cover_image ? (
                                        <div className="relative">
                                            <img
                                                src={formData.cover_image}
                                                alt="Preview"
                                                className="mx-auto max-h-32 w-full object-cover"
                                                onError={() => setCoverImageError(true)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({...prev, cover_image: null}));
                                                    setSelectedCoverFile(null);
                                                }}
                                                className="absolute top-0 right-0 p-1 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
                                                disabled={isSubmitting}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input
                                                        type="file"
                                                        name="cover_image"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        disabled={isSubmitting}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <textarea
                            name="description"
                            className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="What's on your mind?"
                            value={formData.description}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                        />

                        <div className="flex items-center space-x-2">
                            <button 
                                type="button" 
                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                                disabled={isSubmitting}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                            <button 
                                type="button" 
                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                                disabled={isSubmitting}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 01221 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                            <button 
                                type="button" 
                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                                disabled={isSubmitting}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

             
                    <div className="flex items-center justify-end p-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={closemodal}
                            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.description.trim() || isSubmitting}
                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
                                (!formData.description.trim() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Posting...
                                </span>
                            ) : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}