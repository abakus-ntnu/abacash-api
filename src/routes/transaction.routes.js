import express from 'express';
import * as controller from '../controllers/transaction.controller';
import { createAuthMiddleware } from '../auth';
import { TOKEN } from '../auth/constants';

const router = express.Router();

router.use(createAuthMiddleware(TOKEN));
router.get('/', controller.list);
router.get('/:transactionId', controller.retrieve);
router.post('/', controller.add);

export default router;
