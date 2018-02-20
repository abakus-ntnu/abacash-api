import express from 'express';
import cors from 'cors';
import db from './models';
import forest from 'forest-express-sequelize';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import { urlencoded, json } from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import routes from './routes';
import config, { logger } from './config';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(methodOverride());
app.use(cookieParser());
app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    logger.info(
      {
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        'content-length': tokens.res(req, res, 'content-length'),
        'response-time': tokens['response-time'](req, res)
      },
      'request'
    );
  })
);

if (config.env === 'development') {
  app.use(errorHandler());
}

app.use(
  forest.init({
    modelsDir: `${__dirname}/models`,
    envSecret: config.forestEnv,
    authSecret: config.forestSecret,
    sequelize: db.sequelize
  })
);

app.use('/', routes);

export default app;
