import express from 'express';
import * as controller from '../controllers/customer.controller';
import { createAuthMiddleware } from '../auth';
import { TOKEN, MODERATOR } from '../auth/constants';

const router = express.Router();

router.get('/:lookup', createAuthMiddleware(TOKEN), controller.retrieve);
router.post('/', createAuthMiddleware(TOKEN), controller.create);
router.get('/', createAuthMiddleware(MODERATOR), controller.list);
router.put('/:customerId', createAuthMiddleware(MODERATOR), controller.update);
router.delete('/:customerId', createAuthMiddleware(MODERATOR), controller.destroy);

export default router;
