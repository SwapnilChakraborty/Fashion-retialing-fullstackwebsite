'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PaymentDemoPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-lavender flex items-center justify-center p-4">
                <div className="bg-white p-12 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center border-2 border-black animate-in fade-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black">
                        <CheckCircle className="w-12 h-12 text-black" />
                    </div>
                    <h1 className="text-4xl font-black font-oswald uppercase mb-4">Payment Successful!</h1>
                    <p className="text-xl text-gray-600 mb-8 font-medium">
                        Thank you for your demo purchase. Your order has been "processed".
                    </p>
                    <Link href="/shop">
                        <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800 h-16 text-xl">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-sm">
                        <h2 className="text-2xl font-bold font-oswald uppercase mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold">The Work Jacket</p>
                                        <p className="text-sm text-gray-500">Size: L</p>
                                    </div>
                                </div>
                                <p className="font-bold">₱1,200</p>
                            </div>
                            <div className="flex justify-between pt-2">
                                <p className="text-gray-500">Subtotal</p>
                                <p className="font-medium">₱1,200</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500">Shipping</p>
                                <p className="font-medium">Free</p>
                            </div>
                            <div className="flex justify-between pt-4 border-t-2 border-black text-xl font-bold">
                                <p>Total</p>
                                <p>₱1,200</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-mint/20 p-6 rounded-2xl border-2 border-mint flex items-start gap-4">
                        <Lock className="w-6 h-6 text-mint-800 shrink-0 mt-1" />
                        <div>
                            <p className="font-bold text-mint-900">Secure Demo Environment</p>
                            <p className="text-sm text-mint-800 mt-1">
                                This is a demonstration page. No actual money will be charged, and no real card details are stored.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold font-oswald uppercase">Payment Details</h2>
                        <CreditCard className="w-6 h-6" />
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider">Cardholder Name</label>
                            <Input
                                placeholder="J. DOE"
                                required
                                defaultValue="Demo User"
                                className="border-2 border-black rounded-xl p-6 font-medium focus:ring-4 focus:ring-lavender"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider">Card Number</label>
                            <Input
                                placeholder="0000 0000 0000 0000"
                                required
                                defaultValue="4242 4242 4242 4242"
                                className="border-2 border-black rounded-xl p-6 font-mono text-lg tracking-wider focus:ring-4 focus:ring-lavender"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider">Expiry</label>
                                <Input
                                    placeholder="MM/YY"
                                    required
                                    defaultValue="12/28"
                                    className="border-2 border-black rounded-xl p-6 text-center font-medium focus:ring-4 focus:ring-lavender"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider">CVC</label>
                                <Input
                                    placeholder="123"
                                    required
                                    defaultValue="123"
                                    type="password"
                                    maxLength={3}
                                    className="border-2 border-black rounded-xl p-6 text-center font-medium focus:ring-4 focus:ring-lavender"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-16 text-xl bg-black text-white hover:bg-gray-800 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mt-4"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    Pay ₱1,200
                                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">DEMO</span>
                                </>
                            )}
                        </Button>

                        <p className="text-xs text-center text-gray-400 font-medium uppercase tracking-wide">
                            Powered by Comfortable Payments
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
