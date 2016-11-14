import Promise from 'bluebird';

export function getTokenAdmin (server) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: '/admin/user/login',
      payload: {
        login: 'login_1',
        password: 'test_001'
      }
    };
    server.inject(options, (response) => {
      const context = {
        token: response.result.token
      };
      resolve(context);
    });
  });
}
