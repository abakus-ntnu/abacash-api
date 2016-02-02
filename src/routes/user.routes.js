import express from 'express';
import * as controller from '../controllers/user.controller';
import * as middleware from '../auth/middleware';

const router = express.Router();

router.use(middleware.isAuthenticated);
router.get('/', controller.list);
router.get('/:id', controller.retrieve);
// router.get('/me', controller.me);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export default router;
