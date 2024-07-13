import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error checking user:', error);
                    localStorage.removeItem('token');
                }
            }
        };

        checkUser();
    }, []);

    const login = async (loginData) => {
        const response = await api.post('/login', loginData);
        localStorage.setItem('token', response.data.token);
        const userResponse = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${response.data.token}`
            }
        });
        setUser(userResponse.data);
    };

    const signup = async (signupData) => {
        const response = await api.post('/register', signupData);
        localStorage.setItem('token', response.data.token);
        const userResponse = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${response.data.token}`
            }
        });
        setUser(userResponse.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
