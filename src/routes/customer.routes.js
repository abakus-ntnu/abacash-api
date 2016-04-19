import express from 'express';
import * as controller from '../controllers/customer.controller';
import { isAuthenticated, isTokenAuthenticated } from '../auth/middleware';

const router = express.Router();

router.get('/:lookup', isTokenAuthenticated, controller.retrieve);
router.post('/', isTokenAuthenticated, controller.create);
router.get('/', isAuthenticated, controller.list);
router.put('/:customerId', isAuthenticated, controller.update);
router.delete('/:customerId', isAuthenticated, controller.destroy);

export default router;
