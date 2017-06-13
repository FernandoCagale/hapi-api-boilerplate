const Good = require('good');

exports.register = (server, options, next) => {
  const opt = {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', error: '*', request: '*', response: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout'],
      file: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*', error: '*' }]
      }, {
        module: 'good-squeeze',
        name: 'SafeJson'
      }, {
        module: 'rotating-file-stream',
        args: [
          'file.log',
          {
            size: '1000B',
            path: './logs'
          }
        ]
      }]
    }
  };

  server.register({
    register: Good,
    options: opt
  }, (err) => {
    return next(err);
  });
};

exports.register.attributes = {
  name: 'logs',
  version: '1.0.0'
};

