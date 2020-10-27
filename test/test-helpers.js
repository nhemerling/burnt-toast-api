'use strict';
require('dotenv').config();
const knex = require('knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      hashed_pass: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',
      hashed_pass: 'password',
    },
    {
      id: 3,
      username: 'test-user-3',
      hashed_pass: 'password',
    },
    {
      id: 4,
      username: 'test-user-4',
      hashed_pass: 'password',
    },
    {
      id: 5,
      username: 'test-user-5',
      hashed_pass: 'password',
    },
    {
      id: 6,
      username: 'test-user-6',
      hashed_pass: 'password',
    },
  ];
}

function makeUserProfilesArray() {
  return [
    {
      id: 1,
      fk_user_id: 1,
      full_name: 'User One',
      email: 'testuser1@testytesttest111abc.com',
      zip: '90210',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
    {
      id: 2,
      fk_user_id: 2,
      full_name: 'User Two',
      email: 'testuser2@testytesttest111abc.com',
      zip: '90210',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
    {
      id: 3,
      fk_user_id: 3,
      full_name: 'User Three',
      email: 'testuser3@testytesttest111abc.com',
      zip: '33333',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
    {
      id: 4,
      fk_user_id: 4,
      full_name: 'User Four',
      email: 'testuser4@testytesttest111abc.com',
      zip: '44444',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
    {
      id: 5,
      fk_user_id: 5,
      full_name: 'User Five',
      email: 'testuser5@testytesttest111abc.com',
      zip: '55555',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
    {
      id: 6,
      fk_user_id: 6,
      full_name: 'User Six',
      email: 'testuser6@testytesttest111abc.com',
      zip: '66666',
      profile_desc: 'Some profile desc',
      profile_img_url:
        'https://via.placeholder.com/300.png/0000FF/FFFFFF?text=Placeholder+Img',
    },
  ];
}

function makeCategoriesArray() {
  return [
    {
      id: 1,
      category_name: 'Automotive',
    },
    {
      id: 2,
      category_name: 'Art',
    },
    {
      id: 3,
      category_name: 'Beauty',
    },
    {
      id: 4,
      category_name: 'Computers',
    },
    {
      id: 5,
      category_name: 'Education',
    },
    {
      id: 6,
      category_name: 'Electronics',
    },
    {
      id: 7,
      category_name: 'Food',
    },
    {
      id: 8,
      category_name: 'Handmade',
    },
    {
      id: 9,
      category_name: 'Health',
    },
    {
      id: 10,
      category_name: 'Home',
    },
    {
      id: 11,
      category_name: 'Repair',
    },
    {
      id: 12,
      category_name: 'Sports',
    },
    {
      id: 13,
      category_name: 'Other',
    },
  ];
}

function makeSkillsArray() {
  return [
    {
      id: 1,
      fk_category_id: 1,
      skill_name: 'Car Painting',
      skill_desc: 'Exterior finish painting and vinyl wrapping',
    },
    {
      id: 2,
      fk_category_id: 1,
      skill_name: 'Bumper Repair',
      skill_desc: 'From small scratch and dent fixes to bumper replacements',
    },
    {
      id: 3,
      fk_category_id: 1,
      skill_name: 'Ride Share',
      skill_desc: 'Ut voluptate elit elit pariatur quis voluptate.',
    },
    {
      id: 4,
      fk_category_id: 1,
      skill_name: 'Tires',
      skill_desc:
        'Ullamco quis occaecat minim nisi do ipsum anim velit incididunt.',
    },
    {
      id: 5,
      fk_category_id: 1,
      skill_name: 'Maintenance Training',
      skill_desc:
        'Cillum pariatur ex occaecat et magna minim sunt eu officia qui occaecat nostrud esse magna.',
    },
    {
      id: 6,
      fk_category_id: 2,
      skill_name: 'Art Classes',
      skill_desc:
        'Consectetur deserunt laborum aute reprehenderit in voluptate Lorem voluptate ad ad irure incididunt eu.',
    },
    {
      id: 7,
      fk_category_id: 2,
      skill_name: 'Commissions',
      skill_desc:
        'Nisi cupidatat commodo velit voluptate nisi laboris fugiat et minim aute.',
    },
    {
      id: 8,
      fk_category_id: 3,
      skill_name: 'Homemade',
      skill_desc: 'Duis labore velit dolor reprehenderit eu.',
    },
    {
      id: 9,
      fk_category_id: 3,
      skill_name: 'Makeup',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 10,
      fk_category_id: 3,
      skill_name: 'Skin Care',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 11,
      fk_category_id: 4,
      skill_name: 'Web Design',
      skill_desc:
        'Designing web site graphic elements including layout, color scheme, images, and user interface elements',
    },
    {
      id: 12,
      fk_category_id: 4,
      skill_name: 'Hardware Fix',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 13,
      fk_category_id: 4,
      skill_name: 'Software Setup',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 14,
      fk_category_id: 4,
      skill_name: 'Web Development',
      skill_desc:
        'Writing code to covert a site design/idea into a functioning website',
    },
    {
      id: 15,
      fk_category_id: 5,
      skill_name: 'Language Learning',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 16,
      fk_category_id: 5,
      skill_name: 'Tutorials',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 17,
      fk_category_id: 5,
      skill_name: 'Tutoring',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 18,
      fk_category_id: 6,
      skill_name: 'How to',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 19,
      fk_category_id: 6,
      skill_name: 'Quick Fix',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 20,
      fk_category_id: 7,
      skill_name: 'Diet',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 21,
      fk_category_id: 7,
      skill_name: 'Produce',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 22,
      fk_category_id: 7,
      skill_name: 'Home Cook',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 23,
      fk_category_id: 7,
      skill_name: 'Meal Prep',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 24,
      fk_category_id: 8,
      skill_name: 'Blacksmith',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 25,
      fk_category_id: 8,
      skill_name: 'Knitting',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 26,
      fk_category_id: 8,
      skill_name: 'Leather Craft',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 27,
      fk_category_id: 8,
      skill_name: 'Woodworking',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 28,
      fk_category_id: 9,
      skill_name: 'Excercise',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 29,
      fk_category_id: 9,
      skill_name: 'Healing',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 30,
      fk_category_id: 9,
      skill_name: 'Hugs',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 31,
      fk_category_id: 9,
      skill_name: 'Sound Baths',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 32,
      fk_category_id: 9,
      skill_name: 'Weightlifting',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 33,
      fk_category_id: 10,
      skill_name: 'Decor',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 34,
      fk_category_id: 10,
      skill_name: 'Painting',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 35,
      fk_category_id: 10,
      skill_name: 'Repair',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 36,
      fk_category_id: 10,
      skill_name: 'Roofing',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 37,
      fk_category_id: 11,
      skill_name: 'Computers',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 38,
      fk_category_id: 11,
      skill_name: 'Fences',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 39,
      fk_category_id: 11,
      skill_name: 'Hearts',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 40,
      fk_category_id: 12,
      skill_name: 'Improving form',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 41,
      fk_category_id: 12,
      skill_name: 'Improving Score',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 42,
      fk_category_id: 12,
      skill_name: 'Team',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 43,
      fk_category_id: 13,
      skill_name: 'Active Listening',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 44,
      fk_category_id: 13,
      skill_name: 'Plus One',
      skill_desc: 'A skill in Some Category',
    },
    {
      id: 45,
      fk_category_id: 13,
      skill_name: 'Dance Partner',
      skill_desc: 'A skill in Some Category',
    },
  ];
}

function makeLinkUserSKillsArray() {
  // 4 profiles with skill 6:
  //    3 PROVIDERS/1 SEEKER
  //    2 in 90210 zip
  //    3 with 'funky' in desc
  return [
    {
      id: 1,
      fk_user_id: 2,
      fk_skill_id: 6,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary funky for this skill',
      primary_img_url: null,
    },
    {
      id: 2,
      fk_user_id: 1,
      fk_skill_id: 6,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 3,
      fk_user_id: 3,
      fk_skill_id: 6,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary funky for this skill',
      primary_img_url: null,
    },
    {
      id: 4,
      fk_user_id: 4,
      fk_skill_id: 6,
      user_skill_type: 'SEEKER',
      primary_description: 'User summary funky for this skill',
      primary_img_url: null,
    },
    //Several skills (PROVIDER and SEEKER) for user 1
    {
      id: 5,
      fk_user_id: 1,
      fk_skill_id: 30,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 6,
      fk_user_id: 1,
      fk_skill_id: 22,
      user_skill_type: 'SEEKER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 7,
      fk_user_id: 1,
      fk_skill_id: 27,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 8,
      fk_user_id: 1,
      fk_skill_id: 19,
      user_skill_type: 'SEEKER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 9,
      fk_user_id: 1,
      fk_skill_id: 20,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 10,
      fk_user_id: 1,
      fk_skill_id: 1,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
    {
      id: 11,
      fk_user_id: 1,
      fk_skill_id: 2,
      user_skill_type: 'PROVIDER',
      primary_description: 'User summary for this skill',
      primary_img_url: null,
    },
  ];
}

function makeSkillsDetailArray() {
  return [
    {
      id: 1,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/FF0000/000000?text=BEST',
      details_description: 'The best photo of me being the best at this',
    },
    {
      id: 2,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/00FF00/000000?text=BEST',
      details_description: 'Another best photo of me being the best at this',
    },
    {
      id: 3,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=BEST',
      details_description: 'Again, the best',
    },
    {
      id: 4,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/FF0000/FFFFFF?text=BEST',
      details_description: 'BEST',
    },
    {
      id: 5,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/00FF00/000000?text=BEST',
      details_description: 'the best',
    },
    {
      id: 6,
      fk_link_user_skill_id: 11,
      detail_img_url:
        'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=BEST',
      details_description: 'you guessed it - still the best',
    },
  ];
}
/**
 * generate fixtures of languages and words for a given user
 * @param {object} user - contains `id` property
 * @returns {Array(languages, words)} - arrays of languages and words
 */

/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        "skill_detail",
        "link_user_skill",
        "skill",
        "category",
        "user_profile",
        "registered_user" RESTART IDENTITY CASCADE`
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE skill_detail_id_seq minvalue 0 START WITH 1`),
          trx.raw(
            `ALTER SEQUENCE link_user_skill_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`ALTER SEQUENCE skill_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE category_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE user_profile_id_seq minvalue 0 START WITH 1`),
          trx.raw(
            `ALTER SEQUENCE registered_user_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('skill_detail_id_seq', 0)`),
          trx.raw(`SELECT setval('link_user_skill_id_seq', 0)`),
          trx.raw(`SELECT setval('skill_id_seq', 0)`),
          trx.raw(`SELECT setval('category_id_seq', 0)`),
          trx.raw(`SELECT setval('user_profile_id_seq', 0)`),
          trx.raw(`SELECT setval('registered_user_id_seq', 0)`),
        ])
      )
  );
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    hashed_pass: bcrypt.hashSync(user.hashed_pass, 1),
  }));
  return db.transaction(async (trx) => {
    await trx.into('registered_user').insert(preppedUsers);

    await trx.raw(`SELECT setval('registered_user_id_seq', ?)`, [
      users[users.length - 1].id,
    ]);
  });
}

//TODO Implement individual seed<Entity> functions as needed
function seedProfiles(db, profiles) {}

function seedCategories(db, categories) {}

function seedSkills(db, skills) {}

function seedLinkUserSkill(db, userSkills) {}

function seedSkillDetails(db, details) {}

function seedDb(db) {
  const usersArray = makeUsersArray();
  const profilesArray = makeUserProfilesArray();
  const categoriesArray = makeCategoriesArray();
  const skillsArray = makeSkillsArray();
  const userSkillsArray = makeLinkUserSKillsArray();
  const skillDetailsArray = makeSkillsDetailArray();

  return db.transaction(async (trx) => {
    await seedUsers(trx, usersArray);
    //await seedProfiles(trx, this.makeUserProfilesArray());
    await trx.into('user_profile').insert(profilesArray);
    await trx.into('category').insert(categoriesArray);
    await trx.into('skill').insert(skillsArray);
    await trx.into('link_user_skill').insert(userSkillsArray);
    await trx.into('skill_detail').insert(skillDetailsArray);

    await Promise.all([
      trx.raw(`SELECT setval('skill_detail_id_seq', ?)`, [
        skillDetailsArray[skillDetailsArray.length - 1].id,
      ]),
      trx.raw(`SELECT setval('link_user_skill_id_seq', ?)`, [
        userSkillsArray[userSkillsArray.length - 1].id,
      ]),
      trx.raw(`SELECT setval('skill_id_seq', ?)`, [
        skillsArray[skillsArray.length - 1].id,
      ]),
      trx.raw(`SELECT setval('category_id_seq', ?)`, [
        categoriesArray[categoriesArray.length - 1].id,
      ]),
      trx.raw(`SELECT setval('user_profile_id_seq', ?)`, [
        profilesArray[profilesArray.length - 1].id,
      ]),
      trx.raw(`SELECT setval('registered_user_id_seq', ?)`, [
        usersArray[usersArray.length - 1].id,
      ]),
    ]);
  });
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeCategoriesArray,
  makeUserProfilesArray,
  makeAuthHeader,
  makeLinkUserSKillsArray,
  cleanTables,
  seedUsers,
  seedDb,
};
