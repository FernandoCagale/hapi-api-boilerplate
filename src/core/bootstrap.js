const Promise = require('bluebird');
const path = require('path');
const server = require('./server');
const boot = require('./bin/boot');
const load = require('./util/load');
const core = require('./util/core-function');

const fs = Promise.promisifyAll(require('fs'));

module.exports = {start};

const type = process.argv[2];

function start () {
  return Promise.resolve()
  .then(() => {
    console.log('===> load Database');

    const dir = path.join(__dirname, '/../models/**.js');
    const fixtures = path.join(__dirname, '/../../data/fixtures/*.json');

    const config = load.getDatabase();

    return registerToServer({
      register: require('k7'),
      options: {
        models: dir,
        adapter: require('k7-sequelize'),
        connectionOptions: {
          database: config.database,
          username: config.username,
          password: config.password,
          options: {
            host: config.host,
            port: config.port,
            dialect: config.dialect,
            logging: false
          }
        },
        optionsFixtures: {
          path: fixtures
        }
      }
    })
    .catch((err) => {
      console.log('==> Error load Database', err);
      throw err;
    });
  })
  .then(() => {
    console.log('===> load core plugins');

    const dir = path.join(__dirname, '/plugins');

    return fs.readdirAsync(dir)
    .filter(core.filterProduction)
    .map((file) => {
      return {
        register: require(path.join(dir, file))
      };
    })
    .then(registerToServer)
    .catch((err) => {
      console.log('==> Error load core plugins', err);
      throw err;
    });
  })
  .then(() => {
    console.log('===> load plugins routes');

    return fs.readdirAsync(path.join(__dirname, '..'))
      .filter(core.filterCoreDirectories)
      .map((dir) => {
        return {
          register: require(path.join(__dirname, '..', dir))
        };
      })
      .then(registerToServer)
      .catch((err) => {
        console.log('===> Error load plugins routes', err);
        throw err;
      });
  })
  .then(async (context) => {
    try {
      switch (process.env.NODE_ENV) {
        case 'production':
          await boot.production(server);
          break;
        case 'sandbox':
          await boot.sandbox(server);
          break;
        case 'test':
          await boot.test(server);
          break;
        default:
          await boot.development(server, type);
      }
      return context;
    } catch (err) {
      console.log('===> Error boot', err);
      throw err;
    }
  })
  .then(() => {
    if (process.env.NODE_ENV === 'test') {
      return server;
    }

    server.start((err) => {
      if (err) {
        throw err;
      }

      console.log('info', 'Server running at: ' + server.info.uri);
    });
  })
  .catch((err) => {
    console.log('===> App Error' + err);
    throw err;
  });
}

function registerToServer (plugins) {
  return new Promise((resolve, reject) => {
    server.register(plugins, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
