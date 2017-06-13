'use strict';

const redis = require('redis');
const load = require('./util/load');

const config = load.getRedis();
const client = redis.createClient(config.port, config.host);

client.on('connect', () => {
  console.log('===> connected redis');
});

module.exports = client;
