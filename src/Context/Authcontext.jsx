import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const verifyAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
           const response = await axios.get('http://localhost:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setUser({
                ...response.data.profile,
                token: token
            });
        } catch (err) {
            console.error('Auth verification failed:', err);
            localStorage.removeItem('token');
            setError(err.response?.data?.message || 'Session expired');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            await verifyAuth(); 
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axios.get('http://localhost:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            error,
            login,
            logout,
            verifyAuth,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};