import dotenv from 'dotenv';

dotenv.load({silent: true});

export const getServer = () => {
  const config = {
    host: process.env['SERVER_HOST'],
    port: process.env['SERVER_PORT']
  };

  return config;
};

export const getDatabase = () => {
  const env = process.env['NODE_ENV'];

  const config = {
    port: process.env['BD_PORT'],
    host: process.env['BD_HOST'],
    username: process.env['BD_USER'],
    password: process.env['BD_PASSWORD'],
    database: env && env === 'test' ? process.env['BD_DATABASE'] + '_test' : process.env['BD_DATABASE'],
    dialect: 'postgres'
  };

  return config;
};
