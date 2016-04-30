import express from 'express';
import * as controller from '../controllers/transaction.controller';
import { requires } from '../auth';
import { TOKEN } from '../auth/constants';

const router = express.Router();

router.use(requires(TOKEN));
router.get('/', controller.list);
router.get('/:transactionId', controller.retrieve);
router.post('/', controller.add);

export default router;
