/* global describe, it, expect, server */

const ENDPOINT = '/admin/user';

describe(`Routes admin ${ENDPOINT}`, () => {
  let token = null;

  describe(`POST ${ENDPOINT}/login`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: `${ENDPOINT}/login`,
        payload: {
          login: 'login_2',
          password: 'login_002'
        }
      };
      server.inject(options, (response) => {
        expect(response.result).to.exist();
        expect(response.result.token).to.exist();
        expect(response.statusCode).to.equals(200);

        token = response.result.token;

        done();
      });
    });

    it('returns 401 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: `${ENDPOINT}/login`,
        payload: {
          login: 'login_test',
          password: 'test_009'
        }
      };
      server.inject(options, (response) => {
        expect(response.result.statusCode).to.equals(401);
        expect(response.result.error).to.equals('Unauthorized');
        done();
      });
    });
  });

  describe(`POST ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`},
        payload: getDefault()
      };
      server.inject(options, (response) => {
        expect(response.result).to.exist();
        expect(response.result.token).to.exist();
        expect(response.statusCode).to.equals(200);

        token = response.result.token;

        done();
      });
    });
  });

  describe(`GET ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        expect(response.result.login).to.equals('login_test');
        done();
      });
    });
  });

  describe(`PUT ${ENDPOINT}`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'PUT',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`},
        payload: {
          login: 'login_test_alter',
          password: 'login_alter_001'
        }
      };
      server.inject(options, (response) => {
        expect(response.result).to.exist();
        expect(response.statusCode).to.equals(200);
        expect(response.result.id).to.exist();
        done();
      });
    });
  });

  describe(`POST ${ENDPOINT}/logout`, () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: `${ENDPOINT}/logout`,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.statusCode).to.equals(200);
        done();
      });
    });

    it('returns 401 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: ENDPOINT,
        headers: {'Authorization': `Bearer ${token}`}
      };
      server.inject(options, (response) => {
        expect(response.result.statusCode).to.equals(401);
        expect(response.result.error).to.equals('Unauthorized');
        done();
      });
    });
  });
});

function getDefault () {
  let payload = {
    login: 'login_test',
    password: 'login_001'
  };
  return payload;
}
