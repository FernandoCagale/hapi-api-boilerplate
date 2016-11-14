/* global describe, it, expect, server */

describe('Routes /user', () => {
  let token = null;

  describe('POST /admin/user/login', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/admin/user/login',
        payload: {
          login: 'login_1',
          password: 'login_001'
        }
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('token');

        token = response.result.token;

        done();
      });
    });

    it('returns 401 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/admin/user/login',
        payload: {
          login: 'login_test',
          password: 'test_009'
        }
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 401);
        expect(response.result).to.have.property('error', 'Unauthorized');
        done();
      });
    });
  });

  describe('POST /admin/user', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/admin/user',
        headers: {'Authorization': 'Bearer ' + token},
        payload: getDefault()
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response).to.have.property('statusCode', 200);
        expect(response.result).to.have.property('token');

        token = response.result.token;
        done();
      });
    });
  });

  describe('GET /admin/user', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: '/admin/user',
        headers: {'Authorization': 'Bearer ' + token}
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response).to.have.property('statusCode', 200);
        expect(response.result).to.have.property('login', 'login_test');
        done();
      });
    });
  });

  describe('PUT /admin/user', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'PUT',
        url: '/admin/user',
        headers: {'Authorization': 'Bearer ' + token},
        payload: {
          login: 'login_test_alter',
          password: 'login_alter_001'
        }
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('statusCode', 200);
        expect(response).to.have.property('result');
        expect(response.result).to.have.property('id');

        done();
      });
    });
  });

  describe('POST /admin/user/logout', () => {
    it('returns 200 HTTP status code', (done) => {
      const options = {
        method: 'POST',
        url: '/admin/user/logout',
        headers: {'Authorization': 'Bearer ' + token}
      };
      server.inject(options, (response) => {
        expect(response).to.have.property('result');
        expect(response).to.have.property('statusCode', 200);
        done();
      });
    });

    it('returns 401 HTTP status code', (done) => {
      const options = {
        method: 'GET',
        url: '/admin/user',
        headers: {'Authorization': 'Bearer ' + token}
      };
      server.inject(options, (response) => {
        expect(response.result).to.have.property('statusCode', 401);
        expect(response.result).to.have.property('error', 'Unauthorized');
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
