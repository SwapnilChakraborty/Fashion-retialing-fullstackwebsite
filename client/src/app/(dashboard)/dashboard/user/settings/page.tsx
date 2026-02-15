'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { User, Bell, Lock } from 'lucide-react';

export default function UserSettingsPage() {
    const { user } = useAuth();

    return (
        <div>
            <div className="mb-8 border-b-2 border-black pb-4">
                <h1 className="text-4xl font-black font-oswald uppercase">Settings</h1>
                <p className="text-gray-500 font-medium">Manage your profile and preferences</p>
            </div>

            <div className="space-y-8 max-w-2xl">
                {/* Profile Section */}
                <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <User className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center gap-2">
                        <User className="w-6 h-6" /> Profile Information
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                value={user?.name || ''}
                                readOnly
                                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-black transition-colors cursor-not-allowed opacity-70"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-black transition-colors cursor-not-allowed opacity-70"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">* Profile details are managed by your administrator or linked account.</p>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-mint/30 p-8 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center gap-2">
                        <Bell className="w-6 h-6" /> Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-black/10">
                            <div>
                                <p className="font-bold">Order Updates</p>
                                <p className="text-sm text-gray-600">Receive emails about your order status</p>
                            </div>
                            <div className="w-12 h-6 bg-black rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold">Promotions</p>
                                <p className="text-sm text-gray-600">Receive emails about new collections</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center gap-2">
                        <Lock className="w-6 h-6" /> Security
                    </h3>
                    <Button variant="outline" className="w-full border-2 border-black py-6 text-lg hover:bg-black hover:text-white transition-all">
                        Change Password
                    </Button>
                </div>
            </div>
        </div>
    );
}
