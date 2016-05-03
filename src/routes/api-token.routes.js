import express from 'express';
import * as controller from '../controllers/api-token.controller';
import { createAuthMiddleware } from '../auth';
import { ADMINISTRATOR } from '../auth/constants';

const router = express.Router();

router.use(createAuthMiddleware(ADMINISTRATOR));
router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

export default router;
