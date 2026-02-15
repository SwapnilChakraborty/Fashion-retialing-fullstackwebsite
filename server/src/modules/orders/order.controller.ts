import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { prisma } from '../../server';
import { z } from 'zod';

// Simple validation schema for order creation
const CreateOrderSchema = z.object({
    cartItems: z.array(z.object({
        productId: z.string(),
        quantity: z.number().min(1)
    })).min(1),
    shippingAddress: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
        country: z.string()
    })
});

export class OrderController {
    private service: OrderService;

    constructor() {
        this.service = new OrderService(prisma);
    }

    // POST /api/orders
    async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            const data = CreateOrderSchema.parse(req.body);

            const order = await this.service.createOrder(
                user.id,
                data.cartItems,
                data.shippingAddress
            );

            res.status(201).json(order);
        } catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ errors: err.errors });
                return;
            }
            next(err);
        }
    }
    // GET /api/orders
    async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            const orders = await this.service.getUserOrders(user.id);
            res.json(orders);
        } catch (err) {
            next(err);
        }
    }
}
