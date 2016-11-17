import * as Schema from '../task.schema';

const schema = Schema.getSchema();
const query = Schema.getQuery();

export function destroy () {
  return {
    params: {
      id: schema
        .id
        .required()
    }
  };
}

export function create () {
  return {
    payload: {
      title: schema
        .title
        .required()
    }
  };
}

export function update () {
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

export function list () {
  return {
    query: query
  };
}
