exports.register = (server, options, next) => {
  const limitDefault = options.limit || 5;

  const search = function () {
    return this.query.search || null;
  };

  const limit = function () {
    return this.query.limit || limitDefault;
  };

  const offset = function () {
    let page = this.query.page || 1;
    if (page) {
      return limit.call(this) * (page - 1);
    }
    return 0;
  };

  server.decorate('request', 'offset', offset);
  server.decorate('request', 'limit', limit);
  server.decorate('request', 'search', search);

  next();
};

exports.register.attributes = {
  name: 'hapi-paginate',
  version: '1.0.0'
};
