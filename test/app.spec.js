'use strict';

const app  = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, burnt_toast"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, burnt_toast');
  });
});