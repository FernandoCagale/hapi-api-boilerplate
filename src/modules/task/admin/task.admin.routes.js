'use strict';

const Controller = require('./task.admin.controller');
const Validator = require('./task.admin.validation');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/admin/task',
      config: {
        description: 'GET task',
        notes: 'GET task',
        tags: ['api', 'admin'],
        auth: {
          scope: ['admin']
        },
        handler: Controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'DELETE',
      path: '/admin/task/{id}',
      config: {
        description: 'DELETE task',
        notes: 'DELETE task',
        tags: ['api', 'admin'],
        plugins: {
          slap: {
            clear: ['task', 'task-id']
          }
        },
        auth: {
          scope: ['admin']
        },
        handler: Controller.destroy,
        validate: Validator.destroy()
      }
    },
    {
      method: 'PUT',
      path: '/admin/task/{id}',
      config: {
        description: 'PUT task',
        notes: 'PUT task',
        tags: ['api', 'admin'],
        plugins: {
          slap: {
            clear: ['task', 'task-id']
          }
        },
        auth: {
          scope: ['admin']
        },
        handler: Controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'POST',
      path: '/admin/task',
      config: {
        description: 'POST task',
        notes: 'POST task',
        tags: ['api', 'admin'],
        plugins: {
          slap: {
            clear: ['task', 'task-id']
          }
        },
        auth: {
          scope: ['admin']
        },
        handler: Controller.create,
        validate: Validator.create()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'task-admin-route',
  version: '1.0.0'
};
