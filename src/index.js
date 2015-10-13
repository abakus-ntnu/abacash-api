import app from './app';
import config from './config';
import { syncDB } from './model-helpers';

function listen() {
    app.listen(config.port, () => {
        console.log('Express server listening on %d, in %s mode',
            config.port, app.get('env'));
    });
}

syncDB({ force: true })
    .then(() => listen());
