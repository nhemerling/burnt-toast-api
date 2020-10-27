'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Skill Endpoints', () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  /**
     * @description Get all the skills from the static skills table.
  **/
  describe('GET /api/skills', () => {
    beforeEach('Insert category and skills', () => {
      helpers.seedDb(db);
    });
    it('Respond with 200 and return an array of skills', () => {
      return supertest(app)
        .get('/api/skills')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .expect(res => {
          expect(res).to.be.an('array');
          expect(res[0]).to.have.property('id');
          expect(res[0]).to.have.property('fk_category_id');
          expect(res[0]).to.have.property('skill_name');
          expect(res[0]).to.have.property('skill_desc');
        });
    });
  });
});