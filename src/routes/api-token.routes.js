import express from 'express';
import * as controller from '../controllers/api-token.controller';
import { requires } from '../auth';
import { ADMINISTRATOR } from '../auth/constants';

const router = express.Router();

router.use(requires(ADMINISTRATOR));
router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

export default router;
