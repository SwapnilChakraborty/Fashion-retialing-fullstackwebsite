import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './category.service';
import { prisma } from '../../server';

export class CategoryController {
    private service: CategoryService;

    constructor() {
        this.service = new CategoryService(prisma);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.service.findAll();
            res.json(categories);
        } catch (err) {
            next(err);
        }
    }
}
