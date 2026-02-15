'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Settings,
    LogOut,
    Package,
    Store
} from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isLoading } = useAuth();
    const pathname = usePathname();

    if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    if (!user) {
        // Ideally handled by middleware or useEffect in context, but adding safe guard
        return null;
    }

    const userLinks = [
        { name: 'Overview', href: '/dashboard/user', icon: LayoutDashboard },
        { name: 'My Orders', href: '/dashboard/user/orders', icon: ShoppingBag },
        { name: 'Settings', href: '/dashboard/user/settings', icon: Settings },
    ];

    const vendorLinks = [
        { name: 'Overview', href: '/dashboard/vendor', icon: LayoutDashboard },
        { name: 'Products', href: '/dashboard/vendor/products', icon: Package },
        { name: 'Orders', href: '/dashboard/vendor/orders', icon: ShoppingBag },
        { name: 'Store Settings', href: '/dashboard/vendor/settings', icon: Store },
    ];

    const links = user.role === 'VENDOR' ? vendorLinks : userLinks;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold tracking-tighter">
                        WR.
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-black text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center mb-4 px-4">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                            {user.name?.[0] || 'U'}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{user.email}</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={logout}>
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
