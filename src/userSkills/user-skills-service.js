'use strict';

const UserSkillsService = {
  postLinkUserSkills(db, linkUserSkill){
    return db
      .insert(linkUserSkill)
      .into('link_user_skill')
      .returning('*');
  },
  getLinkUserSkills(db, id){
    return db
      .select('*')
      .from('link_user_skill')
      .where('fk_user_id', id);
  },
  getUserSkillDetailsById(db, id) { 
    return db 
      .select('*') 
      .from('skill_detail') 
      .where('fk_link_user_skill_id', id); 
  },
  getAllUsersAndSkills(db){
    return db
      .select('*')
      .from('link_user_skill');
  }
};

module.exports = UserSkillsService;