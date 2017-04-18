import redis from 'redis';
import * as load from './util/load';

const config = load.getRedis();
const client = redis.createClient(config.port, config.host);

client.on('connect', () => {
  console.log('===> connected redis');
});

export default client;
