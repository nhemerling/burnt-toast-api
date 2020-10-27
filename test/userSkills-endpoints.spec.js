'use strict';
const { expect } = require('chai');
const supertest = require('supertest');
const { set } = require('../src/app');
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

  describe('/user_skills', () => {
    beforeEach('seed database tables', () => helpers.seedDb(db));

    describe('GET /user_skills', () => {
      const userSkills = helpers.makeLinkUserSKillsArray();
      it(`responds with all link_user_skills`, () => {
        return supertest(app)
          .get('/api/user_skills')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, userSkills);
      });
    });

    describe('POST /user_skills', () => {
      it(`responds with all link_user_skills`, () => {
        const newUserSkill = {
          skill_id: 30,
          skill_desc: 'Testy test test',
          user_skill_type: 'PROVIDER',
        };
        return supertest(app)
          .post('/api/user_skills')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newUserSkill)
          .expect(201)
          .expect((res) => {
            const data = res.body[0];

            expect(data).to.have.property('id');
            expect(data.fk_user_id).to.eql(testUsers[0].id);
            expect(data.fk_skill_id).to.eql(newUserSkill.skill_id);
            expect(data.user_skill_type).to.eql(newUserSkill.user_skill_type);
            expect(data.primary_description).to.eql(newUserSkill.skill_desc);
          });
      });
    });
  });

  describe('GET /user_skills/:user_id', () => {
    beforeEach('seed database tables', () => helpers.seedDb(db));

    it(`responds with all skills for a specified user`, () => {
      const userSkills = helpers
        .makeLinkUserSKillsArray()
        .filter((userSkill) => userSkill.fk_user_id === testUsers[0].id);

      return supertest(app)
        .get(`/api/user_skills/${testUsers[0].id}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect((res) => {
          userSkills.forEach((fixture, idx) => {
            const userSkill = res.body[idx];
            expect(userSkill).to.have.property('id');
            expect(userSkill.fk_user_id).to.eql(testUsers[0].id);
          });
          //, userSkills);
        });
    });
  });
  describe('DELETE /user_skills/:user_skill_id ', () => {
    beforeEach('Seed database tables', () => helpers.seedDb(db));
    const userSkills = helpers.makeLinkUserSKillsArray();
    it('Respond with 200 Skill deleted', () => {
      return supertest(app)
        .delete(`/api/user_skills/${userSkills[0].id}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect('Skill deleted');
    });
  });

  describe('GET /user_skills/details/:user_skill_id', () => {
    beforeEach('Seed database table', () => helpers.seedDb(db));
    const user_skill_id = 11;
    it('Respond with a list of skills details', () => {
      return supertest(app)
        .get(`/api/user_skills/details/${user_skill_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200)
        .expect(res => {
          const data = res.body;
          expect(data).to.be.an('array');
          expect(data[0]).to.have.property('id');
          expect(data[0]).to.have.property('fk_link_user_skill_id');
          expect(data[0]).to.have.property('detail_img_url');
          expect(data[0]).to.have.property('details_description');
        });
    });
  });

  describe('GET /user_skills/skills/:skill_id', () => {
    const userSkills = [
      {
        id: 1,
        fk_user_id: 2,
        fk_skill_id: 6,
        full_name: 'User Two',
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
        full_name: 'User One',
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
        full_name: 'User Three',
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
        full_name: 'User Four',
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
