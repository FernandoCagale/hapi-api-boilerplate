'use strict';

const Joi = require('joi');

module.exports = {
  getSchema: getSchema
};

const schema = {
  id: Joi
    .number()
    .integer()
    .min(0),
  login: Joi
    .string()
    .min(1)
    .max(120)
    .trim(),
  password: Joi
    .string()
    .min(8)
    .max(60)
    .trim()
    .regex(/(?=[\s\S]*[a-z][\s\S]*)(?=[\s\S]*[0-9][\s\S]*)/i, 'strong password')
};

function getSchema () {
  return schema;
}
