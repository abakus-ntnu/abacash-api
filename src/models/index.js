import cls from 'continuation-local-storage';
import Promise from 'bluebird';
import clsBluebird from 'cls-bluebird';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config, { logger } from '../config';

const namespace = cls.createNamespace('abacash-api');
const logging = data => logger.debug(data);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// create sequelize instance with continuation local storage
clsBluebird(namespace, Promise);
Sequelize.useCLS(namespace);
const sequelize = new Sequelize(config.pgUrl, { logging });

const db = fs
  .readdirSync(__dirname)
  .filter(filename => /model.js$/.test(filename))
  .reduce((total, filename) => {
    const model = sequelize.import(path.resolve(__dirname, filename));
    total[capitalize(model.name)] = model;
    return total;
  }, {});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default {
  namespace,
  sequelize,
  Sequelize,
  ...db
};
