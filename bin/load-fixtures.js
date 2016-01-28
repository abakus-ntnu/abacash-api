#!/usr/bin/env babel-node

import { syncDB } from '../src/model-helpers';
import { loadFixtures } from '../test/helpers';

const fixtures = [
    'systems.json',
    'customer-roles.json',
    'customers.json',
    'products.json'
];

syncDB()
    .then(() => loadFixtures(fixtures))
    .then(() => {
        console.log('Loaded fixtures!');
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
