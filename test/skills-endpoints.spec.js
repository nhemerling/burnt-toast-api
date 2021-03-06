'use strict';

const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Skill Endpoints', () => {
  let db;

  const testUsers = helpers.makeUsersArray();

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  before('cleanup', () => {
    return helpers.cleanTables(db);
  });

  before('Seed db', () => {
    return helpers.seedDb(db);
  });

  afterEach('cleanup', () => {
    return helpers.cleanTables(db);
  });

  after('disconnect from db', () => {
    return db.destroy();
  });

  /**
   * @description Get all the skills from the static skills table.
   **/
  describe('GET /api/skills', () => {
    it('Respond with 200 and return an array of skills', () => {
      return supertest(app)
        .get('/api/skills')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect((res) => {
          const skillsArray = res.body;
          expect(skillsArray).to.be.an('array');
          skillsArray.forEach((skill) => {
            expect(skill).to.have.property('id');
            expect(skill).to.have.property('fk_category_id');
            expect(skill).to.have.property('skill_name');
            expect(skill).to.have.property('skill_desc');
          });
        });
    });
  });
});
