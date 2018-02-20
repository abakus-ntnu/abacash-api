import express from 'express';
import * as controller from '../controllers/health.controller';

const router = express.Router();

router.get('/', controller.get);

export default router;
