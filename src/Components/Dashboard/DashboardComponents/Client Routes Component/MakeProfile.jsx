import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';

export default function ProfileForm() {
    const [formData, setFormData] = useState({
        username: '',
        about: '',
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        address: '',
        city: '',
        province: '',
        profile_image: null,
        cover_image: null
    });

    const [selectedProfileFile, setSelectedProfileFile] = useState(null);
    const [selectedCoverFile, setSelectedCoverFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);

    const cld = new Cloudinary({
        cloud: { cloudName: 'dx7waof09' }
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const uploadImageToCloudinary = async (file) => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'profile_preset');

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dx7waof09/image/upload`,
                uploadData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'profile') {
                setSelectedProfileFile(file);
                setFormData(prev => ({
                    ...prev,
                    profile_image: URL.createObjectURL(file)
                }));
            } else {
                setSelectedCoverFile(file);
                setFormData(prev => ({
                    ...prev,
                    cover_image: URL.createObjectURL(file)
                }));
            }
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.profile) {
                    const profile = response.data.profile;
                    setIsEditMode(true);
                    setFormData({
                        username: profile.username || '',
                        about: profile.about || '',
                        first_name: profile.first_name || '',
                        last_name: profile.last_name || '',
                        email: profile.email || '',
                        country: profile.country || '',
                        address: profile.address || '',
                        city: profile.city || '',
                        province: profile.province || '',
                        profile_image: profile.profile_image,
                        cover_image: profile.cover_image
                    });
                }
            } catch (error) {
                console.log("No existing profile found or error:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            let profileImageUrl = formData.profile_image;
            let coverImageUrl = formData.cover_image;


            if (selectedProfileFile) {
                profileImageUrl = await uploadImageToCloudinary(selectedProfileFile);
            }

            if (selectedCoverFile) {
                coverImageUrl = await uploadImageToCloudinary(selectedCoverFile);
            }

            const profileData = {
                ...formData,
                profile_image: profileImageUrl,
                cover_image: coverImageUrl
            };

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };


            const response = isEditMode
                ? await axios.put('http://127.0.0.1:8000/api/profile', profileData, config)
                : await axios.post('http://127.0.0.1:8000/api/profile', profileData, config);

            setSuccess(true);
            setShouldReload(true);

            if (!isEditMode) {
                setIsEditMode(true);
                setSelectedProfileFile(null);
                setSelectedCoverFile(null);
            }
        } catch (err) {
            setError(err.response?.data?.message ||
                (isEditMode ? "Profile update failed" : "Profile creation failed"));
            console.error("Error:", err.response?.data || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        if (success && shouldReload) {
            const timer = setTimeout(() => {
                window.location.reload();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [success, shouldReload]);

    const isCloudinaryUrl = (url) => {
        return url && typeof url === 'string' && url.includes('res.cloudinary.com');
    };

    return (
        <div className="bg-white border rounded-md border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    {isEditMode ? 'Profile updated successfully! Page will refresh shortly...' : 'Profile created successfully! Page will refresh shortly...'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {isEditMode ? 'Update Your Profile' : 'Complete Your Profile'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                About
                            </label>
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                value={formData.about}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Profile Photo
                            </label>
                            <div className="mt-1 flex items-center">
                                <label className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 cursor-pointer">
                                    {formData.profile_image ? (
                                        typeof formData.profile_image === 'string' && formData.profile_image.startsWith('blob:') ? (
                                            <img
                                                src={formData.profile_image}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : isCloudinaryUrl(formData.profile_image) ? (
                                            <img
                                                src={formData.profile_image}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <AdvancedImage
                                                cldImg={cld.image(formData.profile_image).resize(fill().width(150).height(150))}
                                                className="h-full w-full object-cover"
                                            />
                                        )
                                    ) : (
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleFileChange(e, 'profile')}
                                        accept="image/*"
                                    />
                                </label>
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => document.querySelector('input[type="file"]').click()}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Cover Photo
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
                                {formData.cover_image ? (
                                    <div className="w-full h-full">
                                        {typeof formData.cover_image === 'string' && formData.cover_image.startsWith('blob:') ? (
                                            <img
                                                src={formData.cover_image}
                                                alt="Cover"
                                                className="mx-auto max-h-64 w-full object-cover rounded-md"
                                            />
                                        ) : isCloudinaryUrl(formData.cover_image) ? (
                                            <img
                                                src={formData.cover_image}
                                                alt="Cover"
                                                className="mx-auto max-h-64 w-full object-cover rounded-md"
                                            />
                                        ) : (
                                            <AdvancedImage
                                                cldImg={cld.image(formData.cover_image).resize(fill().width(800).height(300))}
                                                className="mx-auto max-h-64 w-full object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-1 text-center">
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
                                                    className="sr-only"
                                                    onChange={(e) => handleFileChange(e, 'cover')}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )}
                                {formData.cover_image && (
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                                        onClick={() => document.querySelector('input[type="file"][accept="image/*"]').click()}
                                    >
                                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Street address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                                State / Province
                            </label>
                            <input
                                type="text"
                                name="province"
                                id="province"
                                value={formData.province}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditMode ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                isEditMode ? 'Update Profile' : 'Create Profile'
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}