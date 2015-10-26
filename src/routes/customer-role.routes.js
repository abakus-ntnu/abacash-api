import express from 'express';
import * as controller from '../controllers/customer-role.controller';

const router = express.Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
