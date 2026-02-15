import Link from 'next/link';

const categories = [
    {
        name: 'Streetwear',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=600',
        href: '/category/streetwear',
    },
    {
        name: 'Luxury',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600',
        href: '/category/luxury',
    },
    {
        name: 'Activewear',
        image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
        href: '/category/activewear',
    },
    {
        name: 'Accessories',
        image: 'https://images.unsplash.com/photo-1509319117193-51043f6556f4?auto=format&fit=crop&q=80&w=600',
        href: '/category/accessories',
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.href} className="group relative block overflow-hidden rounded-xl h-64">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
