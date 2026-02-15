
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'], // Reduced logging to avoid noise
});

async function main() {
    console.log('Reading migration SQL...');
    try {
        // Try reading as UTF-16LE first
        let sql = fs.readFileSync('migration.sql', 'utf16le');

        // Strip BOM if present
        sql = sql.replace(/^\uFEFF/, '');

        // If it looks like garbage (e.g. lots of nulls or weird chars), try utf8
        if (!sql.includes('CREATE TABLE') && !sql.includes('CREATE TYPE')) {
            console.log('UTF-16LE read failed to find keywords, trying UTF-8...');
            sql = fs.readFileSync('migration.sql', 'utf8');
        }

        console.log('SQL content length:', sql.length);
        if (sql.length < 50) {
            console.error('SQL seems too short, aborting.');
            return;
        }

        console.log('Connecting to database...');
        await prisma.$connect();
        console.log('Connected. Executing SQL...');

        // Execute the entire SQL script
        // Note: Prisma might not support multiple statements in one executeRaw call depending on the driver.
        // But for PostgreSQL it usually works.
        const result = await prisma.$executeRawUnsafe(sql);
        console.log('Migration executed successfully. Result:', result);

    } catch (error) {
        console.error('Execution failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
