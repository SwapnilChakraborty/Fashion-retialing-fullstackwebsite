import { Router } from 'express';
import { OrderController } from './order.controller';
import { authenticate } from '../../shared/middleware/auth.middleware';

const router = Router();
const controller = new OrderController();

router.post('/', authenticate, controller.createOrder.bind(controller));
router.get('/', authenticate, controller.getOrders.bind(controller));

export default router;
