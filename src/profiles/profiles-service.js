'use strict';

const { get } = require("../auth/auth-router");

const ProfilesService = {
  getUserProfile(db){
    return db
      .select('*')
      .from('user_profile');
  },
  postUserProfile(db, userProfile){
    return db
      .insert(userProfile)
      .into('user_profile')
      .where('fk_user_id', userProfile.fk_user_id)
      .returning('*');
  },
  getUserProfileById(db, id){
    return db
      .select('*')
      .from('user_profile')
      .where('fk_user_id', id)
      .first();
  },
  updateProfile(db, id, profileInfo){
    return db
      .select('*')
      .from('user_profile')
      .where('fk_user_id', id)
      .update(profileInfo)
      .returning('*');
  }
};

module.exports = ProfilesService;