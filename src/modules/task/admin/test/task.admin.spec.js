/* global describe, before, it, expect, server */

import * as factory from '../../../../test-utils/factory.girl';

describe('Routes /task', () => {
  let token = null;
  let id = null;

  before((done) => {
    factory.getToken(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });

  describe('POST /admin/task', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/admin/task',
        headers: {'Authorization': 'Bearer ' + token},
        payload: {
          title: 'title'
        }
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('id').to.be.a('number').to.be.above(0);

        id = response.result.id;

        done();
      });
    });
  });

  describe('PUT /admin/task', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'PUT',
        url: '/admin/task/' + id,
        headers: {'Authorization': 'Bearer ' + token},
        payload: {
          title: 'title alter'
        }
      };
      server.inject(options, (response) => {
        console.log(response.result);
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('id').to.be.a('number').to.be.above(0);
        done();
      });
    });

    it('return not found', (done) => {
      const options = {
        method: 'PUT',
        url: '/admin/task/100',
        headers: {'Authorization': 'Bearer ' + token},
        payload: {
          title: 'title alter'
        }
      };

      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('error', 'Not Found');
        done();
      });
    });
  });

  describe('DELETE /admin/task/{id}', () => {
    it('returns 200 HTTP status code when record is deleted', (done) => {
      const options = {
        method: 'DELETE',
        url: '/admin/task/' + id,
        headers: {'Authorization': 'Bearer ' + token}
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('id').to.be.a('number').to.be.above(0);
        done();
      });
    });

    it('return not found', (done) => {
      const options = {
        method: 'DELETE',
        url: '/admin/task/100',
        headers: {'Authorization': 'Bearer ' + token}
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('error', 'Not Found');
        done();
      });
    });
  });
});
