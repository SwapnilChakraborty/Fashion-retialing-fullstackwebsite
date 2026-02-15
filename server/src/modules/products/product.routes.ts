import { Router } from 'express';
import { ProductController } from './product.controller';
import { authenticate, authorize } from '../../shared/middleware/auth.middleware';
import { Role } from '@prisma/client';

const router = Router();
const controller = new ProductController();

// Public Routes
router.get('/', controller.getAll.bind(controller));
router.get('/:slug', controller.getOne.bind(controller));

// Vendor Routes (protected)
router.post(
    '/',
    authenticate,
    authorize([Role.VENDOR, Role.ADMIN]),
    controller.create.bind(controller)
);

// router.put('/:id', authenticate, authorize([Role.VENDOR, Role.ADMIN]), (req, res, next) => {
//     // Logic to update...
//     next();
// });

export default router;
