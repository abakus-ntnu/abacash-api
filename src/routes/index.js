import express from 'express';
import db from '../models';
import customer from './customer.routes';
import * as errors from '../components/errors';
// import auth from './auth.routes';
// import product from './product.routes';
// import role from './role.routes';
// import system from './system.routes';
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
    .then(system => {
        if (!system) throw new errors.NotFoundError();
        req.system = system;
        next();
    })
    .catch(next);
});

apiRouter.use('/:system/customers', customer);

// apiRouter.use('/systems', system);
// apiRouter.use('/users', user);
// apiRouter.use('/:system/roles', role);
// apiRouter.use('/:system/products', product);
// apiRouter.use('/:system/transaction', transaction);
// apiRouter.use('/:system/customers', customer);

router.use(errors.pageNotFoundMiddleware);
router.use(errors.errorMiddleware);

export default router;
