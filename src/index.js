import app from './app';
import Raven from 'raven';
import config, { logger } from './config';
import { syncDB } from './model-helpers';

Raven.config(config.sentryDsn, {
  release: config.release,
  environment: config.env,
  tags: {
    git_commit: config.release
  }
}).install();

function listen() {
  app.listen(config.port, () => {
    logger.info(
      'Express server listening on %d, in %s mode',
      config.port,
      config.env
    );
  });
}

syncDB().then(() => listen());
