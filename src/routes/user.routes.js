
import express from 'express';
import * as controller from '../controllers/user.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.retrieve);
// router.get('/me', controller.me);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
