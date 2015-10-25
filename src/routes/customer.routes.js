import express from 'express';
import * as controller from '../controllers/customer.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:customerId', controller.retrieve);
router.post('/', controller.create);
router.put('/:customerId', controller.update);
// router.delete('/:system/:id', controller.destroy);

export default router;
