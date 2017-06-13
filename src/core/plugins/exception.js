const Boom = require('boom');

exports.register = (server, options, next) => {
  const badImplementationCustom = function (err) {
    if (!err) {
      return this.response(Boom.badImplementation('method not implemented'));
    }

    switch (err.name) {
      case 'AttributesInvalidError':
        return this.response(Boom.badData('fields invalid header'));
      case 'SequelizeForeignKeyConstraintError':
        return this.response(Boom.badData('foreign key constraint error'));
      case 'SequelizeUniqueConstraintError':
        return this.response(Boom.badData('unique constraint error'));
      case 'SequelizeExclusionConstraintError':
        return this.response(Boom.badData('exclusion constraint error'));
      default:
        return this.response(Boom.badImplementation(err.message));
    }
  };

  server.decorate('reply', 'badImplementationCustom', badImplementationCustom);

  next();
};

exports.register.attributes = {
  name: 'hapi-exception-custom',
  version: '1.0.0'
};

