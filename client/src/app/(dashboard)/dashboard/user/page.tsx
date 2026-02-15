'use client';

import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function UserDashboard() {
    const { user } = useAuth();

    const { data: orders, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const { data } = await api.get('/orders');
            return data;
        },
    });

    if (isLoading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-oswald uppercase">Welcome, {user?.name}</h1>
                <p className="text-gray-500">Here is an overview of your recent activity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-lavender p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-bold text-lg mb-2">Total Orders</h3>
                    <p className="text-4xl font-black font-oswald">{orders?.length || 0}</p>
                </div>
                <div className="bg-mint p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-bold text-lg mb-2">Active Shipments</h3>
                    <p className="text-4xl font-black font-oswald">{orders?.filter((o: any) => o.status !== 'DELIVERED').length || 0}</p>
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold font-oswald uppercase mb-4">Recent Orders</h2>
                <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-sm">
                    {orders?.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg">No orders yet</p>
                            <Link href="/#collection" className="mt-4 inline-block">
                                <Button>Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {orders?.map((order: any) => (
                                <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition-colors">
                                    <div className="mb-4 md:mb-0">
                                        <p className="font-bold text-lg">Order #{order.id.slice(0, 8)}</p>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-bold text-lg">₱{order.totalAmount}</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                {order.paymentStatus}
                                            </span>
                                        </div>
                                        <Button variant="outline" size="sm" className="border-black">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
