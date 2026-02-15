'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'USER' | 'VENDOR' | 'ADMIN';
    vendor?: {
        id: string;
        businessName: string;
        slug: string;
    };
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            // Optionally verify token validity here or wait for 401 interceptor
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: any) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            if (data.user.role === 'VENDOR') {
                router.push('/dashboard/vendor');
            } else {
                router.push('/dashboard/user');
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);

            if (data.user.role === 'VENDOR') {
                router.push('/dashboard/vendor');
            } else {
                router.push('/dashboard/user');
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
