import express from 'express';
import * as controller from '../controllers/system.controller';

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.retrieve);
// router.post('/', controller.create);
// router.put('/:system', controller.update);
// router.get('/:system', controller.show);
// router.post('/:system/roles', controller.createRole);

export default router;
