import express from 'express';
import * as controller from '../controllers/nerd.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:username', controller.retrieve);

export default router;
