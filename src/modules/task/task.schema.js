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

export function getSchema () {
  return schema;
}
