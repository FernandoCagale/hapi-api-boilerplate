import Joi from 'joi';

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  title: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  userId: Joi
    .number()
    .integer()
    .min(0)
};

const query = {
  page: Joi
    .number()
    .integer()
    .optional(),
  limit: Joi
    .number()
    .integer()
    .min(0)
    .optional()
};

export function getSchema () {
  return schema;
}

export function getQuery () {
  return query;
}
