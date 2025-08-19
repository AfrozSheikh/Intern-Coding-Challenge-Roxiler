import { Sequelize } from 'sequelize';
import config from './config.js';
import initModels from '../models/index.js';

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    logging: false,
    define: { underscored: true, freezeTableName: true }
  }
);

const models = initModels(sequelize);

export default { sequelize, ...models };
