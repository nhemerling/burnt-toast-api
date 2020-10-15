'use strict';
const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const UserSkillsService = require('../user-skills/user-skills-service');
const ProfilesService = require('./profiles-service');

const profilesRouter = express.Router();
const jsonBodyParser = express.json();

profilesRouter.use(requireAuth);
profilesRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const userProfile = await ProfilesService.getUserProfile(
        req.app.get('db')
      );
      res.send(userProfile);
    } catch (error) {
      next(error);
    }
  })
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const { full_name, email, zip, profile_desc, profile_img_url } = req.body;
      for (const field of ['full_name', 'email']) {
        if (!req.body[field]) {
          return res.status(400).json({
            error: `Missing '${field}' in request body`,
          });
        }
      }
      const userProfile = {
        fk_user_id: req.user.id,
        full_name,
        email,
        zip,
        profile_desc,
        profile_img_url,
      };
      const profile = await ProfilesService.postUserProfile(
        req.app.get('db'),
        userProfile
      );
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  });
profilesRouter
  .route('/:profile_id')
  .get(jsonBodyParser, async (req, res, next) => {
    try {
      const id = req.user.id;
      const profile = await ProfilesService.getUserProfileById(
        req.app.get('db'),
        id
      );
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  })
  .patch(jsonBodyParser, async (req, res, next) => {
    try {
      const { full_name, email, zip, profile_desc, profile_img_url } = req.body;
      const id = req.user.id;
      const profileInfo = {
        full_name,
        email,
        zip,
        profile_desc,
        profile_img_url,
      };
      const updatedProfile = await ProfilesService.updateProfile(
        req.app.get('db'),
        id,
        profileInfo
      );
      res.status(200).json(updatedProfile);
    } catch (error) {
      next(error);
    }
  });




module.exports = profilesRouter;
