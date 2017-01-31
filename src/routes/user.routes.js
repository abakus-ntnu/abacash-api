import express from 'express';
import * as controller from '../controllers/user.controller';
import { createAuthMiddleware } from '../auth';
import { MODERATOR } from '../auth/constants';

const router = express.Router();

router.use(createAuthMiddleware(MODERATOR));
router.get('/', controller.list);
router.put('/password', controller.password);
router.get('/:id', controller.retrieve);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
