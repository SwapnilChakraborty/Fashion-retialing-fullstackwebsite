export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {children}
                </div>
            </div>

            {/* Right Side - Image/Branding */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <div className="absolute inset-0 h-full w-full bg-black">
                    <img
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                        alt="Fashion Background"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-12 text-white">
                        <div className="max-w-md text-center">
                            <h2 className="text-4xl font-bold mb-6">Welcome to Fashion Retail</h2>
                            <p className="text-lg text-gray-200">
                                Join our premium marketplace connecting top vendors with fashion enthusiasts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
