'use strict';

module.exports = {
  read: read,
  list: list
};

async function read (request, reply) {
  try {
    const model = request.database.Task;
    const taskId = request.params.id;

    const options = {
      attributes: ['id', 'title'],
      where: {
        id: taskId
      }
    };

    const cache = await request.getCache(taskId);

    if (cache) {
      return reply(cache).header('allowing-fields', request.fieldsHeaders(options));
    }

    const values = await model.find(request.fieldsAll(options));

    request.addCache(values, taskId);

    if (!values) {
      return reply.notFound();
    }

    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}

async function list (request, reply) {
  try {
    const database = request.database;
    const model = database.Task;

    const options = {
      attributes: ['id', 'title'],
      offset: request.offset(),
      limit: request.limit()
    };

    const cache = await request.getCache();

    if (cache) {
      return reply(cache).header('allowing-fields', request.fieldsHeaders(options));
    }

    const values = await model.findAndCountAll(request.fieldsAll(options));

    request.addCache(values);

    return reply(values).header('allowing-fields', request.fieldsHeaders(options));
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
}
