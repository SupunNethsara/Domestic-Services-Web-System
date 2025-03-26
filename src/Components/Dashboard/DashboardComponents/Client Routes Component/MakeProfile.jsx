import React, { useState } from 'react';
import axios from 'axios';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

export default function MakeProfile() {

    const [selectedProfileFile, setSelectedProfileFile] = useState(null);
    const [selectedCoverFile, setSelectedCoverFile] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [username, setUsername] = useState("");
    const [about, setAbout] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dx7waof09' // Replace with your Cloudinary cloud name
        }
    });
    const uploadImageToCloudinary = async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'profile_preset'); 

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dx7waof09/image/upload`,
                formData
            );
            
            if (type === 'profile') {
                setProfileImageUrl(response.data.secure_url);
            } else {
                setCoverImageUrl(response.data.secure_url);
            }
            
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };


    const handleProfileFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedProfileFile(file);
        }
    };

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedCoverFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Upload images to Cloudinary first
            let profileUrl = null;
            let coverUrl = null;
            
            if (selectedProfileFile) {
                profileUrl = await uploadImageToCloudinary(selectedProfileFile, 'profile');
            }
            
            if (selectedCoverFile) {
                coverUrl = await uploadImageToCloudinary(selectedCoverFile, 'cover');
            }
            
        
            const response = await axios.post('http://127.0.0.1:8000/api/createprofile', {
                username,
                about,
                fname,
                lname,
                email,
                country,
                address,
                city,
                province,
                profileImage: profileUrl,
                coverImage: coverUrl
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log(response);
            setSuccess(true);
            
            if (response.status === 201) {
                setUsername("");
                setAbout("");
                setFname("");
                setLname("");
                setEmail("");
                setCountry("");
                setAddress("");
                setCity("");
                setProvince("");
                setSelectedProfileFile(null);
                setSelectedCoverFile(null);
                setProfileImageUrl(null);
                setCoverImageUrl(null);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Profile creation failed");
            console.error("Full error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="bg-white border rounded-md border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5 p-6">
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
                                <p className="text-sm text-green-700">Profile created successfully!</p>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Complete Your Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    {/* Username */}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Username
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            About
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                placeholder="A short description about yourself"
                            />
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                            Profile Photo
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                                <label className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 cursor-pointer">
                                    {selectedProfileFile ? (
                                        <img
                                            src={URL.createObjectURL(selectedProfileFile)}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : profileImageUrl ? (
                                        <AdvancedImage 
                                            cldImg={cld.image(profileImageUrl).resize('fill').width(150).height(150)} 
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                    <input
                                        type="file"
                                        id="profileImage"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleProfileFileChange}
                                        accept="image/*"
                                    />
                                </label>
                                <button
                                    type="button"
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => document.getElementById('profileImage').click()}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Cover photo
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {selectedCoverFile ? (
                                        <img
                                            src={URL.createObjectURL(selectedCoverFile)}
                                            alt="Cover"
                                            className="mx-auto h-32 w-full object-cover"
                                        />
                                    ) : coverImageUrl ? (
                                        <AdvancedImage 
                                            cldImg={cld.image(coverImageUrl).resize('fill').width(800).height(300)} 
                                            className="mx-auto h-32 w-full object-cover"
                                        />
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
                                                <label
                                                    htmlFor="cover-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="cover-upload"
                                                        name="cover-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleCoverFileChange}
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {(selectedCoverFile || coverImageUrl) && (
                                <button
                                    type="button"
                                    className="mt-2 text-sm text-red-600 hover:text-red-500"
                                    onClick={() => {
                                        setSelectedCoverFile(null);
                                        setCoverImageUrl(null);
                                    }}
                                >
                                    Remove cover photo
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>

                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            {/* First Name */}
                            <div className="sm:col-span-1">
                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">First Name</label>
                                <div className="mt-1 sm:mt-0">
                                    <input
                                        type="text"
                                        name="fname"
                                        id="fname"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="sm:col-span-1">
                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Last Name</label>
                                <div className="mt-1 sm:mt-0">
                                    <input
                                        type="text"
                                        name="lname"
                                        id="lname"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Email</label>
                                <div className="mt-1 sm:mt-0">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Country */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Country</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Your Country"
                                    required
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Address</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Your Street Address"
                                    required
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">City</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Your City"
                                    required
                                />
                            </div>
                        </div>

                        {/* Province */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="province" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Province</label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="province"
                                    id="province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Your Province"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : 'Save Profile'}
                </button>
            </div>
        </form>
    </div>
    );
}
