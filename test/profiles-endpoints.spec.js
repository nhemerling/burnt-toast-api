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
          expect(profile).to.have.property('id');
          expect(profile.full_name).to.eql(postAttemptBody.full_name);
          expect(profile.email).to.eql(postAttemptBody.email);
          expect(profile.zip).to.eql(postAttemptBody.zip);
          expect(profile.profile_desc).to.eql(postAttemptBody.profile_desc);
        });
    });
  });

  describe(`PATCH /api/profiles`, () => {
    beforeEach('seed database', () => helpers.seedDb(db));

    const originalTestProfile = helpers.makeUserProfilesArray()[0];

    it(`returns updated userProfile with new 'profile_desc' value`, () => {
      const patchAttemptBody = {
        profile_desc: 'This is an updated description',
      };
      return supertest(app)
        .patch('/api/profiles')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(patchAttemptBody)
        .expect(200)
        .expect((res) => {
          const updatedProfile = res.body[0];
          expect(updatedProfile.full_name).to.eql(
            originalTestProfile.full_name
          );
          expect(updatedProfile.email).to.eql(originalTestProfile.email);
          expect(updatedProfile.zip).to.eql(originalTestProfile.zip);
          expect(updatedProfile.profile_desc).to.eql(
            patchAttemptBody.profile_desc
          );
          expect(updatedProfile.profile_img_url).to.eql(
            originalTestProfile.profile_img_url
          );
        });
    });
  });

  describe(`GET /api/profiles`, () => {
    beforeEach('seed database', () => helpers.seedDb(db));
    const userProfiles = helpers.makeUserProfilesArray();

    it(`responds with an array of all profiles`, () => {
      return supertest(app)
        .get('/api/profiles')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, userProfiles);
    });
  });

  describe(`GET /api/profiles/:profile_id`, () => {
    beforeEach('seed database', () => helpers.seedDb(db));

    const testProfile = helpers.makeUserProfilesArray()[3];
    it(`responds with the specified profile`, () => {
      return supertest(app)
        .get('/api/profiles/4')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200, testProfile);
    });

    it(`returns 404 if profile not found`, () => {
      return supertest(app)
        .get(`/api/profiles/9`)
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(404, { error: `Requested user profile id '9' does not exist` });
    });
  });
});
