'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock data until API supports vendor filtering or we fetch all and filter
const MOCK_VENDOR_ORDERS = [
    { id: 'ORD-1234-5678', customer: 'Alice Smith', items: 2, total: 4500, status: 'PENDING', date: '2024-05-15' },
    { id: 'ORD-8765-4321', customer: 'Bob Jones', items: 1, total: 1200, status: 'SHIPPED', date: '2024-05-14' },
    { id: 'ORD-9999-0000', customer: 'Charlie Brown', items: 3, total: 8900, status: 'DELIVERED', date: '2024-05-10' },
];

export default function VendorOrdersPage() {
    return (
        <div>
            <div className="mb-8 border-b-2 border-black pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black font-oswald uppercase">Store Orders</h1>
                    <p className="text-gray-500 font-medium">Manage and fulfill your customer orders</p>
                </div>
                <div className="bg-lavender px-4 py-2 rounded-lg border border-black font-bold font-oswald">
                    TOTAL: {MOCK_VENDOR_ORDERS.length}
                </div>
            </div>

            <div className="space-y-6">
                {MOCK_VENDOR_ORDERS.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold font-oswald text-xl">{order.id}</h3>
                                <span className={`px-3 py-0.5 rounded-full text-xs font-bold border border-black uppercase ${order.status === 'DELIVERED' ? 'bg-mint' :
                                        order.status === 'SHIPPED' ? 'bg-blue-100' : 'bg-yellow-100'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-gray-600 font-medium">
                                Customer: <span className="text-black font-bold">{order.customer}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="text-center px-8 border-l-0 md:border-l-2 border-dashed border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Items</p>
                            <p className="font-black font-oswald text-2xl">{order.items}</p>
                        </div>

                        <div className="text-center px-8 border-l-0 md:border-l-2 border-dashed border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                            <p className="font-black font-oswald text-2xl">₱{order.total}</p>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            {order.status === 'PENDING' && (
                                <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                                    <Truck className="w-4 h-4 mr-2" /> Mark Shipped
                                </Button>
                            )}
                            {order.status === 'SHIPPED' && (
                                <Button className="flex-1 bg-white text-black border-2 border-black hover:bg-gray-50">
                                    <CheckCircle className="w-4 h-4 mr-2" /> Complete
                                </Button>
                            )}
                            <Button variant="outline" className="border-black">Details</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
