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
        expect(response.result.rows).to.contain.a.thing.with.property('id');
        expect(response.result.rows).to.contain.a.thing.with.property('title');
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
        expect(response.result).to.have.property('id', 1);
        expect(response.result).to.have.property('title', 'title_1');
        done();
      });
    });

    it('return not found', (done) => {
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/100`
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 404);
        expect(response.result).to.have.property('error', 'Not Found');
        done();
      });
    });
  });
});
