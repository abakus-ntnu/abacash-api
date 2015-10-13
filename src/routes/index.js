import express from 'express';
import errors from '../components/errors';
import auth from './auth.routes';
import customer from './customer.routes';
import product from './product.routes';
import role from './role.routes';
import system from './system.routes';
import transaction from './transaction.routes';
import user from './user.routes';

const router = express.Router();
router.use('/auth', auth);

const apiRouter = express.Router();
router.use('/api', apiRouter);
apiRouter.use('/systems', system);
// apiRouter.use('/users', user);
// apiRouter.use('/:system/roles', role);
// apiRouter.use('/:system/products', product);
// apiRouter.use('/:system/transaction', transaction);
// apiRouter.use('/:system/customers', customer);

router.use(errors[404]);
router.use(errors.errorMiddleware);

export default router;
