export const create = async (request, reply) => {
  try {
    const model = request.database.Task;
    const payload = request.payload;

    payload.userId = request.auth.credentials.id;

    const value = await model.create(payload);

    return reply({id: value.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const update = async (request, reply) => {
  try {
    const model = request.database.Task;
    const id = request.params.id;
    const payload = request.payload;

    const value = await model.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    const valueUpdate = await value.update(payload, {where: {id: id}});
    return reply({id: valueUpdate.id});
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const destroy = async (request, reply) => {
  try {
    const model = request.database.Task;
    const id = request.params.id;

    const value = await model.findOne({where: {id: id}});
    if (!value) {
      return reply.notFound();
    }

    await value.destroy();

    return reply({
      id: value.id
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};
