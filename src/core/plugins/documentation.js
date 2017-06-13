const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../../package');

exports.register = (server, options, next) => {
  const swaggerOptions = {
    schemes: ['http'],
    info: {
      'title': 'API Documentation',
      'description': 'API documentation.',
      'version': Pack.version,
      'termsOfService': 'https://github.com/glennjones/hapi-swagger/',
      'contact': {
        'email': 'fernando.b.cagale@gmail.com'
      },
      'license': {
        'name': 'MIT',
        'url': 'https://raw.githubusercontent.com/glennjones/hapi-swagger/master/license.txt'
      }
    },
    jsonEditor: true,
    securityDefinitions: {
      'Bearer': {
        'type': 'apiKey',
        'name': 'Authorization',
        'in': 'header'
      }
    },
    security: [{ 'Bearer ': [] }]
  };

  server.register([
    Inert,
    Vision,
    {
      'register': HapiSwagger,
      'options': swaggerOptions
    }], (err) => {
    if (err) {
      throw err;
    }
    return next();
  });
};

exports.register.attributes = {
  name: 'documentation',
  version: '1.0.0'
};
