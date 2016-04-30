import express from 'express';
import * as controller from '../controllers/system.controller';
import { requires } from '../auth';
import { ADMINISTRATOR } from '../auth/constants';

const router = express.Router();

router.use(requires(ADMINISTRATOR));
router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.retrieve);
router.put('/:id', controller.update);

export default router;
