import express from 'express';
import * as controller from '../controllers/user.controller';
import { requires } from '../auth';
import { MODERATOR } from '../auth/constants';

const router = express.Router();

router.use(requires(MODERATOR));
router.get('/', controller.list);
router.get('/:id/systems', controller.systems);
router.get('/:id', controller.retrieve);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
