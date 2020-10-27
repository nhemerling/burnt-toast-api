'use strict';

const SkillsService = {
  getAllSkills(db) {
    return db.select('*').from('skill').orderBy('id');
  },
};

module.exports = SkillsService;
