import { Router } from 'express';
import auth from './auth.routes';
import customer from './customer.routes';
import user from './user.routes';
import product from './product.routes';
import customerRole from './customer-role.routes';
import productGroup from './product-group.routes';
import transaction from './transaction.routes';
import apiToken from './api-token.routes';
import health from './health.routes';
import * as errors from '../components/errors';
import Raven from 'raven';
import config from '../config';

const router = Router();

Raven.config(config.sentryDsn).install();
router.use(Raven.requestHandler());

router.use('/authenticate', auth);
router.use('/users', user);
router.use('/api-tokens', apiToken);
router.use('/customers', customer);
router.use('/roles', customerRole);
router.use('/product-groups', productGroup);
router.use('/products', product);
router.use('/transactions', transaction);
router.use('/health', health);

router.use(errors.pageNotFoundMiddleware);
router.use(Raven.errorHandler());
router.use(errors.errorMiddleware);

export default router;
