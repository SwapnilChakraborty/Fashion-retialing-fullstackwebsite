
import { Router } from 'express';
import { VendorController } from './vendor.controller';
import { authenticate } from '../../shared/middleware/auth.middleware';

const router = Router();
const controller = new VendorController();

router.get('/', controller.getAll.bind(controller));
router.post('/register', authenticate, controller.register.bind(controller));
router.get('/dashboard', authenticate, controller.getDashboard.bind(controller));

export default router;
