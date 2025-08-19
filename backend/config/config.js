import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  seedAdmin: {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    address: process.env.ADMIN_ADDRESS
  }
};

export default config;
