import express from 'express';
import * as controller from '../controllers/system.controller';

const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.retrieve);
router.put('/:id', controller.update);

export default router;
