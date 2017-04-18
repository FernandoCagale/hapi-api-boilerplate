import * as Controller from './task.public.controller';
import * as Validator from './task.public.validation';

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/public/task/{id}',
      config: {
        description: 'GET task',
        notes: 'GET id task',
        tags: ['api', 'public'],
        auth: false,
        plugins: {
          slap: {
            rule: 'task-id'
          }
        },
        handler: Controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'GET',
      path: '/public/task',
      config: {
        description: 'GET task',
        notes: 'GET task',
        tags: ['api', 'public'],
        auth: false,
        plugins: {
          slap: {
            rule: 'task'
          }
        },
        handler: Controller.list,
        validate: Validator.list()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'task-public-route',
  version: '1.0.0'
};
