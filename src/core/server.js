import Hapi from 'hapi';
import * as load from './util/load';

const conf = load.getServer();

let server = new Hapi.Server();

server.connection({
  host: conf.host,
  port: conf.port,
  routes: {
    cors: {
      credentials: true,
      additionalHeaders: ['fields']
    },
    validate: {
      options: {
        abortEarly: false
      }
    }
  }
});

export default server;
