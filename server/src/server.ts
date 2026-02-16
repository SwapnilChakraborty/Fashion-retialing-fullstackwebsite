import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 8000;
const MODE = process.env.MODE || 'single'; // "single" or "multi"

// Middleware
app.use(cors());
app.use(express.json());

// Example Global Route Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Fashion Retail API Backend',
    mode: MODE,
    status: 'healthy'
  });
});

import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/product.routes';
import vendorRoutes from './modules/vendors/vendor.routes';
import orderRoutes from './modules/orders/order.routes';
import categoryRoutes from './modules/categories/category.routes';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error Handler]', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Mode: ${MODE.toUpperCase()} Vendor Marketplace`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

if (require.main === module) {
  startServer(Number(port));
}


export default app;
export { prisma };
