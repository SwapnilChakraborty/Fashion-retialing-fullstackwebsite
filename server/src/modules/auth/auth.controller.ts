import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { prisma } from '../../server';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(['USER', 'VENDOR']).optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export class AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService(prisma);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = registerSchema.parse(req.body);
            const result = await this.service.registerUser(data);
            res.status(201).json(result);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(400).json({ error: err.message });
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = loginSchema.parse(req.body);
            const result = await this.service.login(data);
            res.json(result);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(401).json({ error: err.message });
        }
    }
}
