import Analytics from 'analytics-node';
import config from '../config';

const analytics = new Analytics('abacash', {
    host: config.analyticsDomain
});

export default analytics;
