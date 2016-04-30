import express from 'express';
import * as controller from '../controllers/customer.controller';
import { requires } from '../auth';
import { TOKEN, MODERATOR } from '../auth/constants';

const router = express.Router();

router.get('/:lookup', requires(TOKEN), controller.retrieve);
router.post('/', requires(TOKEN), controller.create);
router.get('/', requires(MODERATOR), controller.list);
router.put('/:customerId', requires(MODERATOR), controller.update);
router.delete('/:customerId', requires(MODERATOR), controller.destroy);

export default router;
