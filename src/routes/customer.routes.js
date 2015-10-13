import express from 'express';
import controller from '../controllers/customer.controller';

const router = express.Router();

router.get('/:system', controller.index);
router.post('/:system', controller.create);
router.get('/:system/:id', controller.show);
router.put('/:system/:id', controller.update);
router.delete('/:system/:id', controller.destroy);
router.get('/:system/role/:id', controller.role);

export default router;
