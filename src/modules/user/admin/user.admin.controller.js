import jwt from 'jsonwebtoken';
import client from '../../../core/client.redis';

export const create = async (request, reply) => {
  try {
    const database = request.database;
    const model = database.User;
    const payload = request.payload;

    const value = await model.create(payload);

    const tokenUser = getToken(value.id);

    setRedis(tokenUser, value.id);

    return reply({
      token: tokenUser
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const read = async (request, reply) => {
  try {
    const model = request.database.User;

    const options = {
      where: {id: request.auth.credentials.id},
      attributes: ['login']
    };

    const value = await model.findOne(options);
    if (!value) {
      return reply.notFound();
    }

    return reply(value);
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const update = async (request, reply) => {
  try {
    const model = request.database.User;
    const id = request.auth.credentials.id;
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

export const login = async (request, reply) => {
  try {
    const model = request.database.User;
    const credentials = request.payload;

    const admin = await model.findOne({ where: {login: credentials.login} });
    if (!admin) {
      return reply.unauthorized('Login or Password invalid');
    }

    if (!admin.validatePassword(credentials.password)) {
      return reply.unauthorized('Login or Password invalid');
    }

    const tokenUser = getToken(admin.id);

    setRedis(tokenUser, admin.id);

    return reply({
      token: tokenUser
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

export const logout = async (request, reply) => {
  try {
    const token = request.headers.authorization.replace('Bearer ', '');

    client.del(token, (err, result) => {
      if (err) {
        throw err;
      }
      return reply();
    });
  } catch (err) {
    return reply.badImplementationCustom(err);
  }
};

function setRedis (token, id) {
  client.set(token, id);
  client.expire(token, (60 * 60) * 24);
}

function getToken (id) {
  const secretKey = process.env.JWT || 'template';

  return jwt.sign({
    id: id,
    scope: ['admin']
  }, secretKey, {expiresIn: '2h'});
}
