'use strict';
const UserSkillsService = {
  postLinkUserSkills(db, linkUserSkill) {
    return db.insert(linkUserSkill).into('link_user_skill').returning('*');
  },
  getLinkUserSkills(db, id) {
    return db
      .select(
        'us.id',
        'us.fk_user_id',
        'us.fk_skill_id',
        'us.user_skill_type',
        'us.primary_img_url',
        'us.primary_description',
        'p.zip',
        's.skill_name',
        'c.category_name'
      )
      .from('link_user_skill as us')
      .join('user_profile as p', 'p.fk_user_id', 'us.fk_user_id')
      .join('skill as s', 's.id', 'us.fk_skill_id')
      .join('category as c', 'c.id', 's.fk_category_id')
      .where('us.fk_user_id', id);
  },
  getUserSkillDetailsById(db, id) {
    return db
      .select('*')
      .from('skill_detail')
      .where('fk_link_user_skill_id', id);
  },
  getAllUsersAndSkills(db) {
    return db.select('*').from('link_user_skill');
  },
  getUserSkillsBySkill(db, skillId) {
    return db
      .select(
        'us.id',
        'us.fk_user_id',
        'us.fk_skill_id',
        'us.user_skill_type',
        'us.primary_img_url',
        'us.primary_description',
        'p.zip',
        's.skill_name'
      )
      .from('link_user_skill as us')
      .join('user_profile as p', 'p.fk_user_id', 'us.fk_user_id')
      .join('skill as s', 's.id', 'us.fk_skill_id')
      .where('fk_skill_id', skillId);
  },
};

module.exports = UserSkillsService;
