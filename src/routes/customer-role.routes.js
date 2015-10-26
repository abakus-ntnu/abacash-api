import express from 'express';
import * as controller from '../controllers/customer-role.controller';

const router = express.Router();

router.post('/', controller.create);

export default router;
