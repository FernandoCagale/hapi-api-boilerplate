/* global describe, before, it, expect, server */

const factory = require('../../../../test-utils/factory.girl');

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
        expect(response.statusCode).to.equals(200);
        expect(response.result).to.exist();
        expect(response.result.id).to.exist();

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
        expect(response.statusCode).to.equals(200);
        expect(response.result).to.exist();
        expect(response.result.id).exist();
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
        expect(response.result.statusCode).to.equals(404);
        expect(response.result.error).to.equals('Not Found');
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
        expect(response.statusCode).to.equals(200);
        expect(response.result).to.exist();
        expect(response.result.id).to.exist();
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
        expect(response.result.statusCode).to.equals(404);
        expect(response.result.error).to.equals('Not Found');
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
        expect(response.result.count).to.exist();
        expect(response.result.count).to.equals(1);
        expect(response.result.rows).to.exist();
        expect(response.result.rows[0].id).to.exist();
        expect(response.result.rows[0].id).to.equals(2);
        expect(response.result.rows[0].title).to.exist();
        expect(response.result.rows[0].title).to.equals('title_2');
        done();
      });
    });
  });
});
