import express from 'express';
import * as controller from '../controllers/product.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/all', controller.listAll);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.delete('/:id', controller.destroy);
/*
router.post('/:system', controller.create);
router.get('/:system/all', controller.getAll);
router.get('/:system/:id', controller.show);
router.put('/:system/:id', controller.update);
router.delete('/:system/:id', controller.destroy);
router.get('/:system/type/:type', controller.type);
*/

export default router;
