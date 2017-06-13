'use strict';

const Schema = require('../task.schema');

module.exports = {
  read: read,
  list: list
};

const schema = Schema.getSchema();
const query = Schema.getQuery();

function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

function read () {
  return {
    headers: schema.fields,
    params: {
      id: schema
        .id
        .required()
    }
  };
}
