import { Router } from 'express';
import db from '../models';
import auth from './auth.routes';
import customer from './customer.routes';
import system from './system.routes';
import user from './user.routes';
import product from './product.routes';
import nerd from './nerd.routes';
import customerRole from './customer-role.routes';
import productGroup from './product-group.routes';
import transaction from './transaction.routes';
import apiToken from './api-token.routes';
import * as errors from '../components/errors';
import raven from 'raven';
import config from '../config';

const router = Router();
const apiRouter = Router();

router.use(apiRouter);

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

apiRouter.use('/authenticate', auth);
apiRouter.use('/users', user);
apiRouter.use('/systems', system);
apiRouter.use('/nerd', nerd);

apiRouter.use('/:system/api-tokens', apiToken);
apiRouter.use('/:system/customers', customer);
apiRouter.use('/:system/roles', customerRole);
apiRouter.use('/:system/product-groups', productGroup);
apiRouter.use('/:system/products', product);
apiRouter.use('/:system/transactions', transaction);

router.use(errors.pageNotFoundMiddleware);
router.use(raven.middleware.express.errorHandler(config.sentryDsn));
router.use(errors.errorMiddleware);

export default router;
