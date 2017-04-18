import * as Schema from '../task.schema';

const schema = Schema.getSchema();
const query = Schema.getQuery();

export function list () {
  return {
    headers: schema.fields,
    query: query
  };
}

export function read () {
  return {
    headers: schema.fields,
    params: {
      id: schema
        .id
        .required()
    }
  };
}
