const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Profiles Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();
  const [testUser] = testUsers;

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`POST /api/profiles`, () => {
    beforeEach('seed database', () => helpers.seedDb(db));

    //check required fields
    const requiredFields = ['full_name', 'email'];

    requiredFields.forEach((field) => {
      const postAttemptBody = {
        full_name: 'Test Profile',
        email: 'test@test.com',
        zip: '90210',
        profile_desc: 'Lorem ipsum I have no profile pic',
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete postAttemptBody[field];

        return supertest(app)
          .post('/api/profiles')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(postAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it(`responds with newlyCreated userProfile with valid profile data`, () => {
      const postAttemptBody = {
        full_name: 'Test Profile',
        email: 'test@test.com',
        zip: '90210',
        profile_desc: 'Lorem ipsum I have no profile pic',
      };
      return supertest(app)
        .post('/api/profiles')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(postAttemptBody)
        .expect(201)
        .expect((res) => {
          const profile = res.body[0];
          console.log('profile', profile);
          expect(profile).to.have.property('id');
          expect(profile.full_name).to.eql(postAttemptBody.full_name);
          expect(profile.email).to.eql(postAttemptBody.email);
          expect(profile.zip).to.eql(postAttemptBody.zip);
          expect(profile.profile_desc).to.eql(postAttemptBody.profile_desc);
        });
    });
  });
});
