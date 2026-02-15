
import { PrismaClient, Vendor, Role } from '@prisma/client';
import { prisma } from '../../server';
import { CreateVendorDto } from './vendor.types';

export class VendorService {
    constructor(private readonly db: PrismaClient) { }

    async create(userId: string, data: CreateVendorDto): Promise<Vendor> {
        const existing = await this.db.vendor.findFirst({
            where: {
                OR: [
                    { userId },
                    { slug: data.slug }
                ]
            }
        });

        if (existing) throw new Error('Vendor already exists or slug taken');

        return this.db.$transaction(async (tx) => {
            // Create Vendor
            const vendor = await tx.vendor.create({
                data: {
                    ...data,
                    userId,
                    status: 'PENDING',
                }
            });

            // Update User Role
            await tx.user.update({
                where: { id: userId },
                data: { role: Role.VENDOR }
            });

            return vendor;
        });
    }
    // Add this inside VendorService class

    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.db.vendor.findMany({
                where: { status: 'APPROVED' }, // remove if you don't want filter
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.db.vendor.count({
                where: { status: 'APPROVED' }
            })
        ]);

        return {
            items,
            meta: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    }
    async findBySlug(slug: string) {
        return this.db.vendor.findUnique({
            where: { slug },
            include: { products: { take: 5 } }
        });
    }

    async getDashboard(vendorId: string) {
        // Analytics logic
        const sales = await this.db.subOrder.aggregate({
            where: { vendorId },
            _sum: { vendorEarnings: true },
            _count: true
        });

        return {
            totalEarnings: sales._sum.vendorEarnings || 0,
            totalOrders: sales._count,
            // More metrics...
        };
    }
}
