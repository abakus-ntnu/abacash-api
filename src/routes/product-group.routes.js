import express from 'express';
import * as controller from '../controllers/product-group.controller';
import { createAuthMiddleware } from '../auth';
import { MODERATOR, TOKEN } from '../auth/constants';

const router = express.Router();

router.get('/', createAuthMiddleware(TOKEN), controller.list);
router.post('/', createAuthMiddleware(MODERATOR), controller.create);
router.put('/:id', createAuthMiddleware(MODERATOR), controller.update);
router.delete('/:id', createAuthMiddleware(MODERATOR), controller.destroy);

export default router;
