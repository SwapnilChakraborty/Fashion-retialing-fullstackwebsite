import { NextFunction, Request, Response } from 'express';
import { ProductService } from './product.service';
import { prisma } from '../../server';
import { CreateProductSchema, UpdateProductSchema } from './product.types';
import { ZodError } from 'zod';

export class ProductController {
    private service: ProductService;

    constructor() {
        this.service = new ProductService(prisma);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.findAll(req.query);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await this.service.findOne(req.params.slug);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CreateProductSchema.parse(req.body);
            const user = (req as any).user;
            const vendor = await prisma.vendor.findUnique({ where: { userId: user.id } });

            if (!vendor) {
                return res.status(404).json({ error: 'Vendor profile not found' });
            }

            const product = await this.service.create(data, vendor.id);
            res.status(201).json(product);
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({ errors: err.errors });
            }
            next(err);
        }
    }
}
