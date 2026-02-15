'use client';

import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function VendorProductsPage() {
    const { user } = useAuth();
    const router = useRouter();

    const { data: products, isLoading } = useQuery({
        queryKey: ['vendor-products', user?.vendor?.id],
        queryFn: async () => {
            if (!user?.vendor?.id) return [];
            const { data } = await api.get('/products', {
                params: { vendorId: user.vendor.id }
            });
            // Handle both paginated and non-paginated responses just in case, though we know it's paginated
            return Array.isArray(data) ? data : data.items || [];
        },
        enabled: !!user?.vendor?.id,
    });

    if (isLoading) {
        return <div>Loading details...</div>;
    }

    if (!user?.vendor) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold">Vendor Profile Not Found</h2>
                <p>Please contact support or try re-logging in.</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-oswald uppercase">My Products</h1>
                    <p className="text-gray-500">Manage your product catalog</p>
                </div>
                <Link href="/dashboard/vendor/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl border-2 border-black overflow-hidden shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider font-oswald">Product</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider font-oswald">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider font-oswald">Stock</th>
                            <th className="px-6 py-4 text-left text-sm font-bold text-black uppercase tracking-wider font-oswald">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-bold text-black uppercase tracking-wider font-oswald">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No products found. Add your first product to get started.
                                </td>
                            </tr>
                        ) : (
                            products?.map((product: any) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                                {product.images?.[0] && <img className="h-10 w-10 object-cover" src={product.images[0]} alt="" />}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.category?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        ₱{product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-black hover:text-gray-700 font-bold">Edit</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
