const app = require('../src/app');
const helpers = require('./test-helpers');

describe('UserSkills Endpoints', function () {
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

  /*
  /user_skills
    POST Adds a skill to logged in user (create link_user_skill row)

  /user_skills/:user_id
    GET Returns all skills for a specified user

  /user_skills/skills/:skill_id
    GET  Retrieves matching skill from all profiles
      ?q=queryText
      ?t=skillType
      ?z=zip

  /user_skills/details/:user_skill_id
    GET Return skill_details array for specific link_user_skill.id
  */

  describe('GET /user_skills/skills/:skill_id', () => {
    //seed data
    //it responds with all matching tests with no filters
    //it responds with descriptions containg queryText ?q=
    //it responds with types matching Type ?t=
    //it responds with zips matching ?z=
  });
});

/***
   /**
   * @description Register a user and populate their fields
   **
  describe(`POST /api/profiles`, () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    //check required fields
    const requiredFields = ['full_name', 'email'];

    requiredFields.forEach((field) => {
      const postAttemptBody = {
        //fk_user_id INTEGER REFERENCES registered_user(id) ON DELETE CASCADE NOT NULL,
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
 */
