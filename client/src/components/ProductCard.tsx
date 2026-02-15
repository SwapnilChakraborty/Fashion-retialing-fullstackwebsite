'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    vendor?: {
        storeName: string;
    };
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-48 w-full bg-gray-200">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.vendor?.storeName || 'Unknown Vendor'}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
