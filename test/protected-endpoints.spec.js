const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Protected Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  beforeEach('insert test users', () => {
    return helpers.seedUsers(db, testUsers);
  });

  const protectedEndpoints = [
    /*
     * /api/profiles
     */
    {
      name: 'GET /api/profiles',
      path: '/api/profiles',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/profiles',
      path: '/api/profiles',
      method: supertest(app).post,
    },
    /*
     * /api/profiles/:profile_id
     */
    {
      name: 'GET /api/profiles/:profile_id',
      path: '/api/profiles/1',
      method: supertest(app).post,
    },
    {
      name: 'PATCH /api/profiles/:profile_id',
      path: '/api/profiles/1',
      method: supertest(app).patch,
    },
    /*
     * /api/auth
     */
    {
      name: 'PUT /api/auth',
      path: '/api/auth',
      method: supertest(app).put,
    },
    /*
     * /api/user_skills
     */
    {
      name: 'POST /api/user_skills',
      path: '/api/user_skills',
      method: supertest(app).post,
    },
    /*
     * /api/user_skills/:user_id
     */
    {
      name: 'GET /api/user_skills/:user_id',
      path: '/api/user_skills/1',
      method: supertest(app).get,
    },
    /*
     * /api/user_skills/skills/:skill_id
     */
    {
      name: 'GET /api/user_skills/skills/:skill_id',
      path: '/api/user_skills/skills/1',
      method: supertest(app).get,
    },
    /*
     * /api/user_skills/details/:user_skill_id
     */
    {
      name: 'GET /api/user_skills/details/:user_skill_id',
      path: '/api/user_skills/details/1',
      method: supertest(app).get,
    },
    /*
     * /api/users/
     */
    {
      name: 'DELETE /api/users',
      path: '/api/users',
      method: supertest(app).delete,
    },
    /*
     * /api/skills
     */
    {
      name: 'GET /api/skills',
      path: '/api/skills',
      method: supertest(app).get,
    },
  ];

  protectedEndpoints.forEach((endpoint) => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint
          .method(endpoint.path)
          .expect(401, { error: `Missing bearer token` });
      });

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0];
        const invalidSecret = 'bad-secret';
        return endpoint
          .method(endpoint.path)
          .set(
            'Authorization',
            helpers.makeAuthHeader(validUser, invalidSecret)
          )
          .expect(401, { error: `Unauthorized request` });
      });

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 };
        return endpoint
          .method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` });
      });
    });
  });
});
