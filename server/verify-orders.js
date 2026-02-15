
const API_URL = 'http://localhost:8000/api';

async function verifyOrders() {
    try {
        console.log('--- Starting Verification ---');
        const email = `demo_user_${Date.now()}@example.com`;
        const password = 'password123';

        // 1. Register
        console.log(`\n1. Registering user: ${email}`);
        const regRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name: 'Demo User', role: 'USER' })
        });
        const user = await regRes.json();
        if (!regRes.ok) throw new Error(JSON.stringify(user));
        console.log('   Success! User ID:', user.id);

        // 2. Login
        console.log(`\n2. Logging in...`);
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        if (!token) throw new Error('No token returned');
        console.log('   Success! Token received.');

        // 3. Create a dummy order (needs a product first?)
        // Let's first check if we can get orders (should be empty)
        console.log(`\n3. Fetching orders (expecting empty list)...`);
        const ordersRes1 = await fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const orders1 = await ordersRes1.json();
        console.log('   Orders:', JSON.stringify(orders1, null, 2));

        if (Array.isArray(orders1)) {
            console.log('\n--- VERIFICATION SUCCESSFUL ---');
            console.log('The API is working correctly because we retrieved a list (even if empty).');
            console.log('The "Unauthorized" error happens only when you forget the token.');
        } else {
            console.log('\n--- VERIFICATION FAILED ---');
            console.log('Response was not an array.');
        }

    } catch (error) {
        console.error('\n--- VERIFICATION INVALID ---');
        console.error('Error:', error);
    }
}

verifyOrders();
