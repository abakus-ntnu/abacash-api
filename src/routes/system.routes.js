import express from 'express';
import * as controller from '../controllers/system.controller';
import { createAuthMiddleware } from '../auth';
import { ADMINISTRATOR } from '../auth/constants';

const router = express.Router();

router.use(createAuthMiddleware(ADMINISTRATOR));
router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.retrieve);
router.get('/:id/users', controller.users);
router.put('/:id', controller.update);

export default router;
