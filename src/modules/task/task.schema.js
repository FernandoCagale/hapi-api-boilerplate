'use strict';

const Joi = require('joi');

module.exports = {
  getQuery: getQuery,
  getSchema: getSchema
};

function getSchema () {
  return {
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
      .min(0),
    fields: Joi.object({
      fields: Joi
      .string()
      .min(1)
      .max(250)
      .trim()
    }).options({ allowUnknown: true })
  };
}

function getQuery () {
  return {
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
}
