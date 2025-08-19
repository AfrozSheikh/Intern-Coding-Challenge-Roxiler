import app from './app.js';
import db from './config/db.js';
import config from './config/config.js';

const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true }); // dev convenience
    app.listen(config.port, () => console.log(`API running on http://localhost:${config.port}`));
  } catch (e) {
    console.error('Failed to start server', e);
    process.exit(1);
  }
};

start();
