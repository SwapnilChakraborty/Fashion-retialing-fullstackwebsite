'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Store, Globe, Image as ImageIcon } from 'lucide-react';

export default function VendorSettingsPage() {
    const { user } = useAuth();
    // In a real app, fetch vendor profile here

    return (
        <div>
            <div className="mb-8 border-b-2 border-black pb-4">
                <h1 className="text-4xl font-black font-oswald uppercase">Store Settings</h1>
                <p className="text-gray-500 font-medium">Customize your shop appearance and details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Store Basics */}
                <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center gap-2">
                        <Store className="w-6 h-6" /> Store Identity
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Store Name</label>
                            <input
                                type="text"
                                defaultValue="Maria Clara Styles"
                                className="w-full p-4 bg-white border-2 border-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-lavender transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Description</label>
                            <textarea
                                defaultValue="Premium pastel fashion for comfort."
                                rows={4}
                                className="w-full p-4 bg-white border-2 border-black rounded-xl font-medium focus:outline-none focus:ring-4 focus:ring-lavender transition-all resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase tracking-wider mb-2">Custom Slug</label>
                            <div className="flex">
                                <span className="p-4 bg-gray-100 border-2 border-r-0 border-black rounded-l-xl font-medium text-gray-500">
                                    shop.com/
                                </span>
                                <input
                                    type="text"
                                    defaultValue="maria-clara-styles"
                                    className="flex-1 p-4 bg-white border-2 border-black rounded-r-xl font-medium focus:outline-none focus:ring-4 focus:ring-lavender transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branding/Visuals */}
                <div className="space-y-8">
                    <div className="bg-baby-blue/30 p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center gap-2">
                            <ImageIcon className="w-6 h-6" /> Branding
                        </h3>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center overflow-hidden">
                                <span className="font-oswald text-2xl font-bold">LOGO</span>
                            </div>
                            <div>
                                <Button size="sm" className="bg-black text-white mb-2">Upload Logo</Button>
                                <p className="text-xs text-gray-500">Rec: 500x500px PNG</p>
                            </div>
                        </div>
                        <div className="h-32 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-500 font-medium cursor-pointer hover:bg-white hover:border-black transition-all">
                            Upload Cover Banner
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-2xl font-bold font-oswald uppercase mb-4 flex items-center gap-2">
                            <Globe className="w-6 h-6" /> Status
                        </h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold">Store Visibility</p>
                                <p className="text-sm text-gray-600">Visible to public</p>
                            </div>
                            <div className="w-12 h-6 bg-mint rounded-full relative cursor-pointer border border-black">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full transition-all"></div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <Button size="lg" className="bg-black text-white px-12 py-6 text-xl hover:scale-105 transition-transform">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
