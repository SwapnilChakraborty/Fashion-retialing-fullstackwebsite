'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Store } from 'lucide-react';

export default function RegisterPage() {
    const { register } = useAuth();
    const [role, setRole] = useState<'USER' | 'VENDOR'>('USER');
    const [formData, setFormData] = useState({
        name: '',
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
            await register({ ...formData, role });
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mint flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-black">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-black font-oswald uppercase tracking-tight text-black mb-2">
                        Join the Club
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Create your account today
                    </p>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={() => setRole('USER')}
                        className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'USER'
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 hover:border-gray-400 text-gray-500'
                            }`}
                    >
                        <User className="w-6 h-6 mb-2" />
                        <span className="font-bold uppercase tracking-wide">Shopper</span>
                    </button>
                    <button
                        onClick={() => setRole('VENDOR')}
                        className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${role === 'VENDOR'
                                ? 'border-black bg-black text-white'
                                : 'border-gray-200 hover:border-gray-400 text-gray-500'
                            }`}
                    >
                        <Store className="w-6 h-6 mb-2" />
                        <span className="font-bold uppercase tracking-wide">Vendor</span>
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        type="text"
                        required
                        className="border-2 border-gray-200 focus:border-black rounded-lg"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

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

                    <div>
                        <Button type="submit" className="w-full text-lg h-14" isLoading={isLoading}>
                            Create Account
                        </Button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-black hover:underline uppercase tracking-wide">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
