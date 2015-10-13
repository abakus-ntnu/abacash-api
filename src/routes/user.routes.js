
import express from 'express';
import controller from '../controllers/user.controller';
import auth from '../../auth/auth.service';

const router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/new', controller.new);
router.post('/reset', controller.restore);
router.post('/invite', controller.inviteUser);
router.get('/invite/:id', controller.getInvite);
router.put('/invite/:id', controller.invite);
router.get('/reset/:id', controller.getRestore);
router.put('/reset/:id', controller.reset);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

export default router;
