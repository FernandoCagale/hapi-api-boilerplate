import Lab from 'lab';
import chai from 'chai';
import bootstrap from '../core/bootstrap';

import chaiDatetime from 'chai-datetime';
import chaiThings from 'chai-things';

const lab = exports.lab = Lab.script();

chai.use(chaiDatetime);
chai.use(chaiThings);

global.expect = chai.expect;

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
    global.expect(global).to.have.property('server');
    global.expect(global).to.have.property('db');
    done();
  });
});
