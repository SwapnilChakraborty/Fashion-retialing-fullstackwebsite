'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function UserOrdersPage() {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const { data } = await api.get('/orders');
            return data;
        },
    });

    if (isLoading) return <div className="p-8 text-center font-oswald text-xl animate-pulse">Loading orders...</div>;

    return (
        <div>
            <div className="mb-8 border-b-2 border-black pb-4">
                <h1 className="text-4xl font-black font-oswald uppercase">My Orders</h1>
                <p className="text-gray-500 font-medium">Track and manage your purchases</p>
            </div>

            <div className="space-y-6">
                {orders?.length === 0 ? (
                    <div className="bg-white p-16 rounded-3xl border-2 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <Package className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                        <h3 className="text-2xl font-bold font-oswald uppercase mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-8">Looks like you haven't discovered our collection yet.</p>
                        <Link href="/shop">
                            <Button size="lg" className="bg-black text-white px-8">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    orders?.map((order: any) => (
                        <div key={order.id} className="bg-white p-6 md:p-8 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold font-oswald text-lg bg-lavender px-3 py-1 border border-black rounded-md">
                                            #{order.id.slice(0, 8)}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border border-black uppercase ${order.status === 'DELIVERED' ? 'bg-mint' : 'bg-yellow-100'
                                            }`}>
                                            {order.status || 'PROCESSING'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center font-medium">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Placed on {new Date(order.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="text-right w-full md:w-auto flex md:block justify-between items-center">
                                    <div className="mb-0 md:mb-2">
                                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Total Amount</p>
                                        <p className="text-3xl font-black font-oswald">₱{order.totalAmount}</p>
                                    </div>
                                    <Button variant="outline" className="border-black hover:bg-black hover:text-white">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
