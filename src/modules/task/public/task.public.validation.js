import * as Schema from '../task.schema';

const schema = Schema.getSchema();
const query = Schema.getQuery();

export function list () {
  return {
    query: query
  };
}

export function read () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}
