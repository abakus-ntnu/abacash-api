import express from 'express';
import * as controller from '../controllers/api-token.controller';

const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

export default router;
