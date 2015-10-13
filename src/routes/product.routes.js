import express from 'express';
import controller from './product.controller';

const router = express.Router();

router.get('/:system', controller.active);
router.post('/:system', controller.create);
router.get('/:system/all', controller.index);
router.get('/:system/:id', controller.show);
router.put('/:system/:id', controller.update);
router.delete('/:system/:id', controller.destroy);
router.get('/:system/type/:type', controller.type);

export default router;
