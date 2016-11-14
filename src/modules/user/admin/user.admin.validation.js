import * as Schema from '../user.schema';

const schema = Schema.getSchema();

export function read () {
  return {};
}

export function logout () {
  return {};
}

export function login () {
  return {
    payload: {
      login: schema
        .login
        .required(),
      password: schema
        .password
        .required()
    }
  };
}

export function create () {
  return {
    payload: {
      login: schema
        .login
        .required(),
      password: schema
        .password
        .required()
    }
  };
}

export function update () {
  return {
    payload: {
      login: schema
        .login
        .required(),
      password: schema
        .password
        .optional()
    }
  };
}
