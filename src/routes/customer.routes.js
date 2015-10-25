import express from 'express';
import * as controller from '../controllers/customer.controller';

const router = express.Router({
    mergeParams: true
});

router.get('/', controller.list);
router.get('/:customerId', controller.retrieve);
// router.get('/:system/:id', controller.show);
// router.put('/:system/:id', controller.update);
// router.delete('/:system/:id', controller.destroy);
// router.get('/:system/role/:id', controller.role);

export default router;
