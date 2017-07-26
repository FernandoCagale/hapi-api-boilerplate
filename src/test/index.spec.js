'use strict';

const Lab = require('lab');
const Code = require('code');
const bootstrap = require('../core/bootstrap');

const lab = exports.lab = Lab.script();

global.expect = Code.expect;

global.it = lab.it;
global.before = lab.before;
global.beforeEach = lab.beforeEach;
global.after = lab.after;
global.describe = lab.describe;

global.describe('===> load the bootstrap', () => {
  global.before((done) => {
    bootstrap.start().then((server) => {
      console.log('===> server executed');
      global.server = server;
      global.db = global.server.database;
      done();
    })
    .catch((err) => {
      console.log('Error loading bootstrap');
      console.log(err);
    });
  });

  global.it('===> load server finalized', (done) => {
    global.expect(global.server).to.exist();
    global.expect(global.db).to.exist();
    done();
  });
});
