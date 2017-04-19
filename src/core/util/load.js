import dotenv from 'dotenv';

dotenv.load({silent: true});

export const getServer = () => {
  const config = {
    host: process.env['SERVER_HOST'],
    port: process.env['SERVER_PORT'] || '8080'
  };

  return config;
};

export const getDatabase = () => {
  const env = process.env['NODE_ENV'] || 'development';

  const config = {
    port: process.env['POSTGRES_PORT_5432_TCP_PORT'] || process.env['BD_PORT'] || '5434',
    host: process.env['POSTGRES_PORT_5432_TCP_ADDR'] || process.env['BD_HOST'] || '127.0.0.1',
    username: process.env['BD_USER'] || 'template',
    password: process.env['BD_PASS'] || 'template',
    database: process.env['BD_NAME'] || 'template',
    dialect: 'postgres'
  };

  if (env === 'test') {
    config.database += '_test';
  }

  return config;
};

export const getRedis = () => {
  const config = {
    host: process.env['REDIS_PORT_6379_TCP_ADDR'] || '127.0.0.1',
    port: process.env['REDIS_PORT_6379_TCP_PORT'] || '6379'
  };

  return config;
};
