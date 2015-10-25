/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import routes from './routes';

// Setup server
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

app.use('/', routes);

export default app;
