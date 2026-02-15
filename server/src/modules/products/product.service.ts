import { PrismaClient, Product } from '@prisma/client';
import { prisma } from '../../server';
import { CreateProductDto, UpdateProductDto, CreateProductSchema } from './product.types';

export class ProductService {
    constructor(private readonly db: PrismaClient) { }

    async findAll(query: any) {
        const { category, search, page = 1, limit = 10, vendorId } = query;
        const skip = (page - 1) * limit;

        const where: any = {
            isActive: true,
        };

        if (category) {
            where.category = { slug: category };
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // For Multi-Vendor Mode
        if (vendorId) {
            where.vendorId = vendorId;
        }

        const [items, total] = await Promise.all([
            this.db.product.findMany({
                where,
                include: {
                    category: { select: { name: true, slug: true } },
                    vendor: { select: { businessName: true, slug: true } },
                },
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            this.db.product.count({ where }),
        ]);

        return {
            items,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit)),
            },
        };
    }

    async findOne(slugOrId: string) {
        // Check if UUID or slug
        const isId = slugOrId.match(/^[0-9a-fA-F-]{36}$/);

        return this.db.product.findFirst({
            where: isId ? { id: slugOrId } : { slug: slugOrId },
            include: {
                category: true,
                vendor: true,
                reviews: {
                    take: 5,
                    include: { user: { select: { name: true, avatar: true } } },
                },
            },
        });
    }

    async create(data: CreateProductDto, vendorId: string) {
        // Validate DTO using Zod schema if not done in middleware (good practice to double check or trust middleware)
        // Here we trust the middleware for basic shape, but check relations.

        // Business Logic: Check if category exists
        const category = await this.db.category.findUnique({ where: { id: data.categoryId } });
        if (!category) throw new Error('Category not found');

        const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

        return this.db.product.create({
            data: {
                ...data,
                slug,
                vendorId,
            },
        });
    }
}
