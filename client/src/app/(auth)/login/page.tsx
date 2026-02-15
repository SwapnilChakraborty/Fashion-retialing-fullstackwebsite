'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(formData);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-lavender flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-black">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black font-oswald uppercase tracking-tight text-black mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Sign in to access your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Email address"
                        type="email"
                        required
                        className="border-2 border-gray-200 focus:border-black rounded-lg"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        required
                        className="border-2 border-gray-200 focus:border-black rounded-lg"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    {error && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-black text-black hover:bg-black hover:text-white"
                            onClick={() => {
                                setFormData({ email: 'user@demo.com', password: 'password123' });
                            }}
                        >
                            Demo Shopper
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="border-black text-black hover:bg-black hover:text-white"
                            onClick={() => {
                                setFormData({ email: 'vendor@demo.com', password: 'password123' });
                            }}
                        >
                            Demo Vendor
                        </Button>
                    </div>

                    <div>
                        <Button type="submit" className="w-full text-lg h-14" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-bold text-black hover:underline uppercase tracking-wide">
                        Sign up
                    </Link>
                </p>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center justify-center gap-2">
                        ← Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
