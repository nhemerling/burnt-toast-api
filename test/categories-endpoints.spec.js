const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Categories Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testCategories = helpers.makeCategoriesArray();

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`GET /api/categories`, () => {
    beforeEach('seed data', () => helpers.seedDb(db));

    it(`responds with 200 and array of categories when user is logged in`, () => {
      return supertest(app)
        .get('/api/categories')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, testCategories);
    });

    it(`responds with 401 Not Authroized when not logged in`, () => {
      return supertest(app).get('/api/categories').expect(401);
    });
  });
});
