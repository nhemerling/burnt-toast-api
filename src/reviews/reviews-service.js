'use strict';


const ReviewsService = {
  postReview(db, review){
    return db
      .insert(review)
      .into('review')
      .returning('*');
  },
  getReviews(db, user_skill_id){
    return db
      .select('*')
      .from('review')
      .where('fk_link_user_skill_id', user_skill_id);
  }
};

module.exports = ReviewsService;