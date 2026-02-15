// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_URL = 'http://localhost:8000/api';

async function main() {
    console.log('Starting verification...');

    // 1. Setup Database (Create Category)
    console.log('Creating category...');
    const category = await prisma.category.create({
        data: {
            name: 'Test Category ' + Date.now(),
            slug: 'test-category-' + Date.now(),
            // description removed as it does not exist in schema
        }
    });
    console.log('Category created:', category.id);

    try {
        // 2. Register User (Vendor)
        console.log('Registering Vendor User...');
        const userRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Vendor',
                email: `vendor${Date.now()}@test.com`,
                password: 'password123',
                role: 'VENDOR'
            })
        });

        if (!userRes.ok) throw new Error(`User registration failed: ${await userRes.text()}`);
        const userData = await userRes.json();
        const token = userData.accessToken;
        console.log('Vendor User registered.');

        // 3. Register Vendor Profile
        console.log('Creating Vendor Profile...');
        const vendorRes = await fetch(`${API_URL}/vendors/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                businessName: 'Test Shop ' + Date.now(),
                slug: 'test-shop-' + Date.now(),
                description: 'A test shop'
            })
        });

        if (!vendorRes.ok) throw new Error(`Vendor profile creation failed: ${await vendorRes.text()}`);
        const vendorData = await vendorRes.json();
        console.log('Vendor Profile created:', vendorData.id);

        // 4. Create Product
        console.log('Creating Product...');
        const productRes = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: 'Test Product ' + Date.now(),
                description: 'A test product description that is long enough',
                price: 100,
                stock: 10,
                categoryId: category.id,
                images: ['https://via.placeholder.com/150']
            })
        });

        if (!productRes.ok) throw new Error(`Product creation failed: ${await productRes.text()}`);
        const productData = await productRes.json();
        console.log('Product created:', productData.id);

        // 5. Place Order (Self-ordering for simplicity)
        console.log('Placing Order...');
        const orderRes = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cartItems: [
                    { productId: productData.id, quantity: 1 }
                ],
                shippingAddress: {
                    street: '123 Test St',
                    city: 'Test City',
                    state: 'TS',
                    postalCode: '12345',
                    country: 'Test Country'
                }
            })
        });

        if (!orderRes.ok) throw new Error(`Order placement failed: ${await orderRes.text()}`);
        const orderData = await orderRes.json();
        console.log('Order placed successfully:', orderData.id);

        console.log('\nVerification SUCCESS!');
    } catch (error) {
        console.error('\nVerification FAILED:', error);
        process.exit(1);
    } finally {
        // Cleanup
        console.log('Cleaning up...');
        try {
            // Delete in order of dependencies: SubOrder -> Order -> Product -> Vendor -> User -> Category
            // For this script, we just need to clean what we created.
            // Since we don't have IDs for everything easily available without more queries or tracking, 
            // and this is a dev DB, we might skip full cleanup or do it carefully.
            // For now, let's just accept that test data remains or try to delete the created category if empty.

            // Actually, deleting the category fails if products exist. 
            // Let's just log that we are done.
            console.log('Test data created. Check database if cleanup is needed.');
        } catch (err) {
            console.error('Cleanup failed:', err);
        }

        await prisma.$disconnect();
    }
}

main();
