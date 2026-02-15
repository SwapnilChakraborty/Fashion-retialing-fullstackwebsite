import { PrismaClient, User, Vendor } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../server';
// Assuming .env or better config
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    constructor(private readonly dataProvider: any) { }

    async registerUser(data: any): Promise<any> {
        const { email, password, name, role = 'USER' } = data;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
            },
            include: { vendor: true },
        });

        // Loophole: If they register as VENDOR, we should probably create a Vendor profile stub or handle it.
        // For now, let's just return the user. The Dashboard will prompt them to complete profile if needed.
        // But for the Demo Vendor, the seed creates it.

        return this.generateTokens(user);
    }

    async login(data: any): Promise<any> {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: { email },
            include: { vendor: true }
        });
        if (!user) throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Invalid credentials');

        return this.generateTokens(user);
    }

    private generateTokens(user: User): any {
        const secret = process.env.JWT_SECRET || 'secret';
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secret,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { id: user.id },
            secret,
            { expiresIn: '7d' }
        );
        return { accessToken, refreshToken, user };
    }
}
