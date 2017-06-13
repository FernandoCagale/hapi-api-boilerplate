'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const basePath = __dirname;

exports.register = (server, options, next) => {
  server.methods.loadRoutes(_.compact(getFiles('routes.js', 'admin')), () => {
    next();
  });
  server.methods.loadRoutes(_.compact(getFiles('routes.js', 'public')), () => {
    next();
  });
};

exports.register.attributes = {
  name: 'modules',
  version: '1.0.3'
};

function getFiles (type, level) {
  return fs.readdirSync(basePath)
  .map((entity) => {
    if (level) {
      let file = path.join(basePath, entity + '/' + level, entity.split('-').join('.') + '.' + level + '.' + type);
      if (!isFile(file)) {
        return;
      }
      return file;
    } else {
      let root = path.join(basePath, entity, type);
      if (!isFile(root)) {
        return;
      }
      return root;
    }
  });
}

function isFile (root) {
  try {
    return fs.statSync(root).isFile();
  } catch (err) {
    return false;
  }
}
