import { NextFunction, Request, Response } from 'express';
import { VendorService } from './vendor.service';
import { prisma } from '../../server';
import { CreateVendorSchema } from './vendor.types';
import { z } from 'zod';

export class VendorController {
    private service: VendorService;

    constructor() {
        this.service = new VendorService(prisma);
    }

    // GET /api/vendors
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const result = await this.service.findAll(page, limit);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    // POST /api/vendors/register
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = CreateVendorSchema.parse(req.body);

            const user = (req as any).user; // Safe fallback without global type
            if (!user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            const vendor = await this.service.create(user.id, data);
            res.status(201).json(vendor);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ errors: err.errors });
                return;
            }
            next(err);
        }
    }

    // GET /api/vendors/dashboard
    async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ error: 'Not authenticated' });
                return;
            }

            const vendor = await prisma.vendor.findUnique({
                where: { userId: user.id }
            });

            if (!vendor) {
                res.status(404).json({ error: 'Vendor profile not found' });
                return;
            }

            const metrics = await this.service.getDashboard(vendor.id);
            res.json(metrics);
        } catch (err) {
            next(err);
        }
    }
}