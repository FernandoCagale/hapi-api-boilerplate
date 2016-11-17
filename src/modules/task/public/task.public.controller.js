export const read = async (request, reply) => {
  try {
    const model = request.database.Task;
    const taskId = request.params.id;

    const options = {
      attributes: ['id', 'title'],
      where: {
        id: taskId
      }
    };

    const values = await model.find(options);
    if (!values) {
      return reply.notFound();
    }

    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const list = async (request, reply) => {
  try {
    const database = request.database;
    const model = database.Task;

    const options = {
      attributes: ['id', 'title'],
      offset: request.offset(),
      limit: request.limit()
    };

    const values = await model.findAndCountAll(options);

    return reply(values);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};
