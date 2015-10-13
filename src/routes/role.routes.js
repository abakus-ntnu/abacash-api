import express from 'express';
import controller from '../controllers/role.controller';

const router = express.Router();

router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
