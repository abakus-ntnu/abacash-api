import express from 'express';
import db from '../models';
import customer from './customer.routes';
import system from './system.routes';
import product from './product.routes';
import customerRole from './customer-role.routes';
import transaction from './transaction.routes';
<<<<<<< HEAD
import authToken from './auth-token.routes';
=======
>>>>>>> aba-19
import * as errors from '../components/errors';
// import auth from './auth.routes';
// import product from './product.routes';
// import transaction from './transaction.routes';
// import user from './user.routes';

const router = express.Router();
const apiRouter = express.Router();

// router.use('/auth', auth);
router.use('/api', apiRouter);
apiRouter.param('system', (req, res, next, id) => {
    db.System.findOne({
        where: { id }
    })
    .then(systemInstance => {
        if (!systemInstance) throw new errors.NotFoundError();
        req.system = systemInstance;
        next();
    })
    .catch(next);
});

apiRouter.use('/auth-tokens', authToken);
apiRouter.use('/systems', system);
apiRouter.use('/:system/customers', customer);
apiRouter.use('/:system/roles', customerRole);
apiRouter.use('/:system/products', product);
apiRouter.use('/:system/transactions', transaction);

// apiRouter.use('/users', user);
// apiRouter.use('/:system/roles', role);
// apiRouter.use('/:system/products', product);
// apiRouter.use('/:system/transaction', transaction);
// apiRouter.use('/:system/customers', customer);

router.use(errors.pageNotFoundMiddleware);
router.use(errors.errorMiddleware);

export default router;
