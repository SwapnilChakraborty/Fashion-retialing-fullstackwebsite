'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ShopPage() {
    const { data: products, isLoading } = useQuery({
        queryKey: ['random-shop'],
        queryFn: async () => {
            const { data } = await api.get('/products?limit=100'); // Fetch enough to shuffle
            const items = Array.isArray(data) ? data : data.items;
            // Random shuffle
            return items.sort(() => 0.5 - Math.random());
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl font-bold font-oswald animate-pulse">LOADING COLLECTION...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-lavender py-20 px-4 text-center border-b-2 border-black">
                <h1 className="text-4xl md:text-8xl font-black font-oswald uppercase leading-none mb-6">
                    The Collection
                </h1>
                <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
                    Curated pieces for the现代 (modern) individual.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b-2 border-black">
                {products?.map((product: any, index: number) => (
                    <Link
                        href={`/products/${product.slug}`}
                        key={product.id}
                        className={`group border-b-2 md:border-b-0 md:border-r-2 border-black p-6 relative overflow-hidden transition-all duration-300 h-[500px] flex flex-col justify-between hover:z-10 hover:shadow-[0px_0px_0px_1000px_rgba(0,0,0,0.5)]`}
                    >
                        <div className="absolute inset-0 bg-white group-hover:bg-mint transition-colors duration-500 -z-10" />

                        <div className="w-full h-3/4 mb-4 relative overflow-hidden">
                            {product.images?.[0] ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-oswald text-4xl">
                                    IMG
                                </div>
                            )}
                            {/* Floating Price Tag */}
                            <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-bold font-oswald z-20 group-hover:scale-110 transition-transform">
                                ₱{product.price}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold font-oswald uppercase mb-1 leading-tight group-hover:translate-x-2 transition-transform">
                                {product.name}
                            </h3>
                            <p className="text-sm font-medium text-gray-600 mb-4">
                                {product.category?.name}
                            </p>

                            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                <span className="font-bold uppercase text-sm tracking-wide">View Details</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer CTA */}
            <div className="bg-black text-white py-24 text-center">
                <h2 className="text-4xl md:text-6xl font-black font-oswald uppercase mb-8">
                    Don't Miss Out
                </h2>
                <Link href="/register">
                    <Button className="bg-white text-black hover:bg-mint hover:border-white border-2 border-transparent h-16 px-12 text-xl">
                        Join the waiting list
                    </Button>
                </Link>
            </div>
        </main>
    );
}
