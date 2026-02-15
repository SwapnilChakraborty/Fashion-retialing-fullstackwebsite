import { PrismaClient } from '@prisma/client';

export class CategoryService {
    constructor(private readonly db: PrismaClient) { }

    async findAll() {
        return this.db.category.findMany({
            orderBy: { name: 'asc' },
        });
    }
}
