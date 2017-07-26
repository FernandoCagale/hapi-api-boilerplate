/* global describe, it, expect, server */

const ENDPOINT = '/public/task';

describe(`Routes public ${ENDPOINT}`, () => {
  describe(`GET ${ENDPOINT}`, () => {
    it('return task at a time', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT
      };
      server.inject(options, (response) => {
        expect(response.result.rows).to.exist();
        expect(response.result.rows[0].id).to.exist();
        expect(response.result.rows[0].title).to.exist();
        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}/{id}`, () => {
    it('return task id', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/1`
      };
      server.inject(options, (response) => {
        expect(response.result.id).to.equals(1);
        expect(response.result.title).to.equals('title_1');
        done();
      });
    });

    it('return not found', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/100`
      };
      server.inject(options, (response) => {
        expect(response.result.statusCode).to.equals(404);
        expect(response.result.error).to.exist('Not Found');
        done();
      });
    });
  });
});
