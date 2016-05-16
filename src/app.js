import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import routes from './routes';
import raven from 'raven';
import { sentryClient } from './components/errors';
import config from './config';

// Global sentry patch
// Setup server
const app = express();

if (config.nodeEnv === 'production' && config.sentryDsn) {
    app.use(raven.middleware.express.requestHandler(config.sentryDsn));
    sentryClient.patchGlobal(() => {
        process.exit(1);
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.use('/', routes);

export default app;
