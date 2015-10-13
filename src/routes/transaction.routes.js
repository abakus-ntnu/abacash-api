import express from 'express';
import controller from '../controllers/transaction.controller';

const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);

export default router;
