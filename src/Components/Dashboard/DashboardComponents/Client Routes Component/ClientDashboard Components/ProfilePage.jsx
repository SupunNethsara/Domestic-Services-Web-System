import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ModernProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.profile);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = () => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete your profile? This action cannot be undone.',
      buttons: [
        {
          label: 'Yes, delete it',
          onClick: async () => {
            try {
              const token = localStorage.getItem('token');
              await axios.delete(`http://127.0.0.1:8000/api/profile`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              localStorage.removeItem('token');
              navigate('/');
            } catch (err) {
              setError(err.response?.data?.message || 'Failed to delete profile');
              console.error('Delete error:', err);
            }
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ]
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  if (error) return <div className="h-screen flex items-center justify-center bg-gray-100 text-red-500">{error}</div>;
  if (!profile) return <div className="h-screen flex items-center justify-center bg-gray-100">Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="relative h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
        {profile.cover_image && (
          <img 
            src={profile.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            {profile.profile_image ? (
              <img 
                src={profile.profile_image} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                <span className="text-gray-500 text-xl font-bold">
                  {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
 
          <div className="px-8 py-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.first_name} {profile.last_name}
              </h1>
              {profile.role && (
                <p className="text-lg text-indigo-600 mt-1">{profile.role}</p>
              )}
              {profile.username && (
                <p className="text-gray-500 mt-1">@{profile.username}</p>
              )}
            </div>
            <div className="mt-4 sm:mt-0 space-x-3">
              <button 
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit Profile
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </div>
          </div>

        
          <div className="border-t border-gray-200"></div>

      
          <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600">
                {profile.about || 'No bio added yet.'}
              </p>
            </div>

          
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
              <div className="space-y-3">
                {profile.email && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                )}
                {profile.mobile && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{profile.mobile}</span>
                  </div>
                )}
                {(profile.city || profile.country) && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">
                      {profile.city}{profile.city && profile.country ? ', ' : ''}
                      {profile.country}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

     
          <div className="bg-gray-50 px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-gray-900">142</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-gray-900">24.5K</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-gray-900">562</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-500">Completion</p>
              </div>
            </div>
          </div>

    
          {profile.skills && profile.skills.length > 0 && (
            <div className="px-8 py-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernProfile;