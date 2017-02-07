import express from 'express';
import * as controller from '../controllers/system.controller';
import { createAuthMiddleware } from '../auth';
import { TOKEN, MODERATOR, ADMINISTRATOR } from '../auth/constants';

const router = express.Router();

router.get('/', createAuthMiddleware(TOKEN), controller.list);
router.post('/', createAuthMiddleware(ADMINISTRATOR), controller.create);
router.get('/:lookup', createAuthMiddleware(TOKEN), controller.retrieve);
router.put('/:id', createAuthMiddleware(MODERATOR), controller.update);

export default router;
