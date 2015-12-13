import express from 'express';
import * as controller from '../controllers/customer.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:lookup', controller.retrieve);
router.post('/', controller.create);
router.put('/:customerId', controller.update);
router.delete('/:customerId', controller.destroy);

export default router;
