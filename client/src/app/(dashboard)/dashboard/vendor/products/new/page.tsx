'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export default function AddProductPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        categoryId: '',
        image: '',
    });

    // Fetch Categories
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data } = await api.get('/categories');
            return data;
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await api.post('/products', {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images: formData.image ? [formData.image] : [],
            });
            router.push('/dashboard/vendor/products');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-8">
                <Link href="/dashboard/vendor/products" className="mr-4 p-2 bg-white rounded-full border border-black hover:bg-gray-100">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold font-oswald uppercase">Add New Product</h1>
                    <p className="text-gray-500">Create a new product listing</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Product Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-2 border-gray-200 focus:border-black rounded-lg"
                    />

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 uppercase font-oswald tracking-wide">
                            Description
                        </label>
                        <textarea
                            required
                            rows={4}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Price (₱)"
                            type="number"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="border-2 border-gray-200 focus:border-black rounded-lg"
                        />
                        <Input
                            label="Stock"
                            type="number"
                            required
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="border-2 border-gray-200 focus:border-black rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 uppercase font-oswald tracking-wide">
                            Category
                        </label>
                        <select
                            required
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            {categories?.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Image URL (Optional)"
                        placeholder="https://..."
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="border-2 border-gray-200 focus:border-black rounded-lg"
                    />

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button type="submit" isLoading={isLoading} className="w-full md:w-auto px-8 h-12 text-lg">
                            <Save className="w-4 h-4 mr-2" />
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
