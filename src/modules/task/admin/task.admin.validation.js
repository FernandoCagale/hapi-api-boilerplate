'use strict';

const Schema = require('../task.schema');

const schema = Schema.getSchema();
const query = Schema.getQuery();

module.exports = {
  destroy: destroy,
  create: create,
  update: update,
  list: list
};

function destroy () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}

function create () {
  return {
    payload: {
      title: schema
        .title
        .required()
    }
  };
}

function update () {
  return {
    params: {
      id: schema
        .id
        .required()
    },
    payload: {
      title: schema
        .title
        .required()
    }
  };
}

function list () {
  return {
    query: query
  };
}
