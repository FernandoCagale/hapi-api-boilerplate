import * as Controller from './user.admin.controller';
import * as Validator from './user.admin.validation';

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/admin/user',
      config: {
        description: 'GET user',
        notes: 'Return based on token',
        tags: ['api', 'admin'],
        auth: {
          scope: ['admin']
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/admin/user',
      config: {
        description: 'POST user',
        notes: 'Save a user',
        tags: ['api', 'admin'],
        auth: {
          scope: ['admin']
        },
        handler: Controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'POST',
      path: '/admin/user/logout',
      config: {
        description: 'POST user logout',
        notes: 'Logout a user',
        tags: ['api', 'admin'],
        auth: {
          scope: ['admin']
        },
        handler: Controller.logout,
        validate: Validator.logout()
      }
    },
    {
      method: 'PUT',
      path: '/admin/user',
      config: {
        description: 'PUT user',
        notes: 'Update based on token',
        tags: ['api', 'admin'],
        auth: {
          scope: ['admin']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'POST',
      path: '/admin/user/login',
      config: {
        description: 'POST user',
        notes: 'User login to the token generation',
        tags: ['api', 'admin'],
        auth: false,
        handler: Controller.login,
        validate: Validator.login()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'user-admin-route',
  version: '1.0.0'
};
