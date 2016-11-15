/* global describe, before, it, expect, server */

import * as factory from '../../../../test-utils/factory.girl';

const ENDPOINT = '/admin/task';

describe(`Routes admin ${ENDPOINT}`, () => {
  let token = null;
  let id = null;

  before((done) => {
    factory.getToken(server)
    .then((context) => {
      token = context.token;
      done();
    });
  });

  describe(`POST ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`},
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

  describe(`PUT ${ENDPOINT}/{id}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'PUT',
        url: `${ENDPOINT}/${id}`,
        headers: {'Authorization': `Bearer ${token}`},
        payload: {
          title: 'title alter'
        }
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
        method: 'PUT',
        url: `${ENDPOINT}/100`,
        headers: {'Authorization': `Bearer ${token}`},
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

  describe(`DELETE ${ENDPOINT}/{id}`, () => {
    it('returns 200 HTTP status code when record is deleted', (done) => {
      const options = {
        method: 'DELETE',
        url: `${ENDPOINT}/${id}`,
        headers: {'Authorization': `Bearer ${token}`}
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
        url: `${ENDPOINT}/100`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('error', 'Not Found');
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('return task at a time', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('count', 1);
        expect(response.result.rows).to.contain.a.thing.with.property('id');
        expect(response.result.rows).to.contain.a.thing.with.property('title');
        done();
      });
    });
  });
});
