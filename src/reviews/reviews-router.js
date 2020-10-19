'use strict';
const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const ReviewsService = require('./reviews-service');

const reviewsRouter = express.Router();
const jsonBodyParser = express.json();

reviewsRouter.use(requireAuth);

reviewsRouter
  .route('/')
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const {user_skill_id, rating, review_text} = req.body;
      const user_id = req.user.id;
      if(!user_skill_id) res.status(400).send('Missing user_skill_id');
      const review = {
        fk_link_user_skill_id: user_skill_id,
        fk_user_id_review_provider: user_id,
        rating,
        review_text
      }
      const postedReview = await ReviewsService.postReview(req.app.get('db'), review)
      res.status(200).json({postedReview});
    } catch (error) {
      next(error);
    }
  });
reviewsRouter
  .route('/:user_skill_id')
  .get(async (req, res, next) => {
    try {
       const {user_skill_id} = req.params;
       const reviews = await ReviewsService.getReviews(req.app.get('db'), user_skill_id);
       res.status(200).json({reviews});     
    } catch (error) {
      next(error);
    }
  })




module.exports = reviewsRouter;