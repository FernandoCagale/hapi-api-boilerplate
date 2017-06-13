'use strict';

const Promise = require('bluebird');

module.exports = {
  getToken: getToken
};

function getToken (server) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: '/admin/user/login',
      payload: {
        login: 'login_1',
        password: 'login_001'
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
