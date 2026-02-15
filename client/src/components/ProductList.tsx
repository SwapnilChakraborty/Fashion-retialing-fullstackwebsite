'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import ProductCard from './ProductCard';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    vendorId: string;
    vendor?: {
        storeName: string;
    };
}

const fetchProducts = async (): Promise<Product[]> => {
    const { data } = await api.get('/products');
    return data.items;
};

export default function ProductList() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-500">
                Failed to load products. Please try again later.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
