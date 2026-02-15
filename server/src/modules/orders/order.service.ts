import { PrismaClient, Vendor, Product, OrderItem } from '@prisma/client';
import { prisma } from '../../server';
// This assumes order splitting function exists or will be created here
import { calculateCommission } from './commission.service';

export class OrderService {
    constructor(private readonly db: PrismaClient) { }

    // Multi-Vendor Order Creation:
    // Split into multiple SubOrders based on vendor
    async createOrder(
        userId: string,
        cartItems: { productId: string; quantity: number }[],
        shippingAddress: any
    ) {
        if (cartItems.length === 0) throw new Error('Cart is empty');

        // Fetch product details for price and vendor
        const productIds = cartItems.map(item => item.productId);
        const products = await this.db.product.findMany({
            where: { id: { in: productIds } },
            include: { vendor: true },
        });

        if (products.length !== cartItems.length) throw new Error('Some products not found');

        // Group items by vendor
        const vendorItems: Record<string, { product: Product & { vendor: Vendor }, quantity: number }[]> = {};
        let totalAmount = 0;

        cartItems.forEach(item => {
            const product = products.find(p => p.id === item.productId)!;
            if (!vendorItems[product.vendorId]) {
                vendorItems[product.vendorId] = [];
            }
            vendorItems[product.vendorId].push({ product, quantity: item.quantity });
            totalAmount += product.price * item.quantity;
        });

        // Transaction to ensure all sub-orders are created or fail together
        return this.db.$transaction(async (tx) => {
            // 1. Create Main Order
            const mainOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    shippingAddress,
                    paymentStatus: 'PENDING',
                },
            });

            // 2. Create Sub-Orders per Vendor
            for (const [vendorId, items] of Object.entries(vendorItems)) {
                let subTotal = 0;
                const subOrderItemsData = items.map(item => {
                    const itemTotal = item.product.price * item.quantity;
                    subTotal += itemTotal;
                    return {
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                    };
                });

                // Calculate commission
                const vendor = items[0].product.vendor;
                const commissionAmount = (subTotal * vendor.commissionRate) / 100;
                const vendorEarnings = subTotal - commissionAmount;

                await tx.subOrder.create({
                    data: {
                        orderId: mainOrder.id,
                        vendorId,
                        subTotal,
                        commission: commissionAmount,
                        vendorEarnings,
                        status: 'PENDING',
                        items: {
                            create: subOrderItemsData,
                        },
                    },
                });
            }

            return mainOrder;
        });
    }
    // Get all orders for a user
    async getUserOrders(userId: string) {
        return this.db.order.findMany({
            where: { userId },
            include: {
                subOrders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        },
                        vendor: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
