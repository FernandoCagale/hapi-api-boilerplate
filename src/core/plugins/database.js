exports.register = (server, options, next) => {
  server.decorate('request', 'database', server.database);

  next();
};

exports.register.attributes = {
  name: 'database',
  version: '1.0.0'
};

