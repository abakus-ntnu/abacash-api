import express from 'express';
import * as controller from '../controllers/transaction.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:transactionId', controller.retrieve);
router.post('/', controller.add);

export default router;
