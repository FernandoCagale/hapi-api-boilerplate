'use strict';

const Schema = require('../user.schema');

module.exports = {
  create: create,
  update: update,
  read: read,
  login: login,
  logout: logout
};

const schema = Schema.getSchema();

function read () {
  return {};
}

function logout () {
  return {};
}

function login () {
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

function create () {
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

function update () {
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
