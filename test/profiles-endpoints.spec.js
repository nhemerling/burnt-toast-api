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

  /**
   * @description Register a user and populate their fields
   **/
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

    //field validation:  email, image_url

    //valid profile/201
  });
});
