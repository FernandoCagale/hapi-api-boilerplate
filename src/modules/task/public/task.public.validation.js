import * as Schema from '../task.schema';

const schema = Schema.getSchema();

export function list () {
  return {};
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
