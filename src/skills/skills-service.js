'use strict';

const SkillsService = {
  getAllSkills(db){
    return db
      .select('*')
      .from('skill');
  }
};

module.exports = SkillsService;