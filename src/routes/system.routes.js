import express from 'express';
import * as controller from '../controllers/system.controller';
import { isAuthenticated } from '../auth/middleware';

const router = express.Router();

router.use(isAuthenticated);
router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.retrieve);
router.put('/:id', controller.update);

export default router;
