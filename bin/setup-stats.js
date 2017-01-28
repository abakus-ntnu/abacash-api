/*
 * Use this script to configure grafana and influxdb in dev.
 * You should setup the grafana backend and dashboard manually when running
 * in production.
 */

import request from 'superagent';
import config from '../src/config';
import { createDatabase } from '../src/components/stats';
import dashboard from '../dashboard.json';

const grafanaBaseUrl = 'http://admin:admin@127.0.0.1:5000/api';

if (!config.influx) {
    console.error('You need to set the influx property in src/config.');
    process.exit(1);
}

/**
 * Create the InfluxDB datasource in grafana.
 */
const createDatasource = () => request.agent()
    .post(`${grafanaBaseUrl}/datasources`)
    .send({
        name: 'abacash',
        type: 'influxdb',
        url: 'http://influxdb:8086',
        access: 'proxy',
        basicAuth: false,
        database: 'abacash',
        isDefault: true
    });

/**
 * Upload the dashboard to grafana.
 */
const createDashboard = () => request.agent()
    .post(`${grafanaBaseUrl}/dashboards/db`)
    .send({
        overwrite: true,
        dashboard
    });

createDatabase()
    .then(createDatasource)
    .then(createDashboard)
    .then(() => {
        console.log('Statistics successfully initialized!');
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
