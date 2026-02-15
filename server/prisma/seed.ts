import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Categories
    const categories = [
        { name: 'Men', slug: 'men' },
        { name: 'Women', slug: 'women' },
        { name: 'Accessories', slug: 'accessories' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }
    console.log('Categories seeded.');

    // 2. Demo Vendor
    const vendorEmail = 'vendor@demo.com';
    const vendorPassword = await bcrypt.hash('password123', 10);

    const vendorUser = await prisma.user.upsert({
        where: { email: vendorEmail },
        update: {},
        create: {
            email: vendorEmail,
            password: vendorPassword,
            name: 'Demo Vendor',
            role: Role.VENDOR,
        },
    });

    const vendor = await prisma.vendor.upsert({
        where: { userId: vendorUser.id },
        update: {},
        create: {
            userId: vendorUser.id,
            businessName: 'Maria Clara Styles',
            slug: 'maria-clara-styles',
            description: 'Premium pastel fashion for comfort.',
            status: 'APPROVED',
        },
    });
    console.log('Demo Vendor seeded.');

    // 3. Demo User
    const userEmail = 'user@demo.com';
    const userPassword = await bcrypt.hash('password123', 10);

    await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            password: userPassword,
            name: 'Demo Shopper',
            role: Role.USER,
        },
    });
    console.log('Demo User seeded.');

    // 4. Products
    const products = [
        {
            name: 'Oversized Linen Blazer',
            description: 'A relaxed fit blazer made from 100% organic linen. Perfect for summer layers.',
            price: 4500,
            stock: 15,
            categoryId: 'women', // Using slug for lookup
            images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Pleated Wide Leg Trousers',
            description: 'High-waisted trousers with sharp pleats and a flowing silhouette.',
            price: 3200,
            stock: 25,
            categoryId: 'women',
            images: ['https://images.unsplash.com/photo-1509631179647-b849389274e9?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Minimalist Cotton Tee',
            description: 'Heavyweight cotton t-shirt with a boxy fit.',
            price: 1200,
            stock: 50,
            categoryId: 'men',
            images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Utility Chore Jacket',
            description: 'Durable canvas jacket with multiple pockets for functionality.',
            price: 5500,
            stock: 10,
            categoryId: 'men',
            images: ['https://images.unsplash.com/photo-1516257984-b1b4d8c9b30b?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Leather Crossbody Bag',
            description: 'Handcrafted leather bag with adjustable strap.',
            price: 8900,
            stock: 5,
            categoryId: 'accessories',
            images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Silk Scarf',
            description: '100% silk scarf with a pastel abstract print.',
            price: 1800,
            stock: 30,
            categoryId: 'accessories',
            images: ['https://images.unsplash.com/photo-1601924994987-69e2c8e6dc01?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Chunky Knit Cardigan',
            description: 'Soft wool blend cardigan in a creamy oatmeal shade.',
            price: 3800,
            stock: 12,
            categoryId: 'women',
            images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop'],
        },
        {
            name: 'Canvas Tote Bag',
            description: 'Spacious tote bag for everyday essentials.',
            price: 900,
            stock: 100,
            categoryId: 'accessories',
            images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop'],
        },
    ];

    for (const p of products) {
        const category = await prisma.category.findUnique({ where: { slug: p.categoryId } });
        if (!category) continue;

        const slug = p.name.toLowerCase().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 1000);

        await prisma.product.upsert({
            where: { slug: slug },
            update: {},
            create: {
                name: p.name,
                slug: slug,
                description: p.description,
                price: p.price,
                stock: p.stock,
                images: p.images,
                categoryId: category.id,
                vendorId: vendor.id,
            }
        });
    }
    console.log('Products seeded.');

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
