import { Store } from 'lucide-react';
import Link from 'next/link';

const vendors = [
    {
        id: 1,
        name: 'Urban Threads',
        description: 'Contemporary streetwear and urban fashion.',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: 2,
        name: 'Luxe Boutique',
        description: 'High-end luxury garments and accessories.',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: 3,
        name: 'EcoWear',
        description: 'Sustainable fashion for the conscious consumer.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=200',
    },
];

export default function FeaturedVendors() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Vendors</h2>
                        <p className="mt-2 text-gray-500">Discover the best independent brands.</p>
                    </div>
                    <Link href="/vendors" className="text-black font-medium hover:underline">View all vendors</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {vendors.map((vendor) => (
                        <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start space-x-4 transition-shadow hover:shadow-md">
                            <img
                                src={vendor.image}
                                alt={vendor.name}
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{vendor.description}</p>
                                <div className="mt-3 flex items-center text-xs font-medium text-black">
                                    <Store className="w-3 h-3 mr-1" />
                                    Visit Store
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
