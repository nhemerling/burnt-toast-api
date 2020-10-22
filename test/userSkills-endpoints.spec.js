const supertest = require('supertest');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('UserSkills Endpoints', function () {
  let db;

  const testUsers = helpers.makeUsersArray();

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
    const userSkills = [
      {
        id: 1,
        fk_user_id: 2,
        fk_skill_id: 6,
        user_skill_type: 'PROVIDER',
        primary_img_url: null,
        primary_description: 'User summary funky for this skill',
        zip: '90210',
        skill_name: 'Art Classes',
      },
      {
        id: 2,
        fk_user_id: 1,
        fk_skill_id: 6,
        user_skill_type: 'PROVIDER',
        primary_img_url: null,
        primary_description: 'User summary for this skill',
        zip: '90210',
        skill_name: 'Art Classes',
      },
      {
        id: 3,
        fk_user_id: 3,
        fk_skill_id: 6,
        user_skill_type: 'PROVIDER',
        primary_img_url: null,
        primary_description: 'User summary funky for this skill',
        zip: '33333',
        skill_name: 'Art Classes',
      },
      {
        id: 4,
        fk_user_id: 4,
        fk_skill_id: 6,
        user_skill_type: 'SEEKER',
        primary_img_url: null,
        primary_description: 'User summary funky for this skill',
        zip: '44444',
        skill_name: 'Art Classes',
      },
    ];

    beforeEach('seed database tables', () => {
      return helpers.seedDb(db);
    });

    //no filters
    it(`responds with all matching link_user_skills`, () => {
      return supertest(app)
        .get('/api/user_skills/skills/6')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, userSkills);
    });

    //queryText ?q=
    it(`responds with only skills containing specified queryTest in the description`, () => {
      const filteredSkills = userSkills.filter((skill) => {
        return skill.primary_description.includes('funky');
      });

      return supertest(app)
        .get('/api/user_skills/skills/6?q=funky')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, filteredSkills);
    });

    //skill_type ?t=PROVIDER
    it(`responds with only skills of specified Type`, () => {
      const filteredSkills = userSkills.filter((skill) => {
        return skill.user_skill_type === 'PROVIDER';
      });

      return supertest(app)
        .get('/api/user_skills/skills/6?t=PROVIDER')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, filteredSkills);
    });

    //Zip ?z=
    it(`responds with only skills in matching zipcode`, () => {
      const filteredSkills = userSkills.filter((skill) => {
        return skill.zip === '90210';
      });

      return supertest(app)
        .get('/api/user_skills/skills/6?z=90210')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, filteredSkills);
    });
  });
});
