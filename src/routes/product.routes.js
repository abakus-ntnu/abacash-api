import express from 'express';
import * as controller from '../controllers/product.controller';

const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.retrieve);
router.delete('/:id', controller.destroy);

export default router;
