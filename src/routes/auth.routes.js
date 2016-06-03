import express from 'express';
import * as controller from '../controllers/auth.controller';
import { createAuthMiddleware } from '../auth';
import { MODERATOR } from '../auth/constants';

const router = express.Router();
router.post('/', controller.login);
router.put('/reset', controller.requestReset);
router.post('/reset', createAuthMiddleware(MODERATOR), controller.reset);
router.get('/invite', createAuthMiddleware(MODERATOR), controller.retrieveInvite);
router.post('/invite', createAuthMiddleware(MODERATOR), controller.invite);

export default router;
