const UserSkillsService = {
  getUserSkillById(db, id) {
    return db.select('*').from('link_user_skill').where('id', id).first();
  },
};

module.exports = UserSkillsService;
