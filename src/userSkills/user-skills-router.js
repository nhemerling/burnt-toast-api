'use strict';
const express = require('express');
const {requireAuth} = require('../middleware/jwt-auth');
const UserSkillsService = require('./user-skills-service');

const userSkillsRouter = express.Router();
const jsonBodyParser = express.json();

userSkillsRouter.use(requireAuth);

userSkillsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const allUsersAndSkills = await UserSkillsService.getAllUsersAndSkills(req.app.get('db'));
      res.status(200).json(allUsersAndSkills);
    } catch (error) {
      next(error)
    }
  })
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const {skill_id, skill_desc, skill_img_url} = req.body;
      const id = req.user.id;
      if (!skill_id) {
        return res.status(400).json({
          error: `Missing skill_id in request body`,
        });
      }
      const linkUserSkill = {
        fk_user_id: id,
        fk_skill_id: skill_id,
        primary_img_url: skill_img_url,
        primary_description: skill_desc
      }
      const userSkill = await UserSkillsService.postLinkUserSkills(req.app.get('db'), linkUserSkill);
      res.status(201).json(userSkill);
    } catch (error) {
      next(error)
    }
  })
userSkillsRouter  
  .route('/:user_id')
  .get(async (req, res, next) => {
    try {
      const id = req.user.id;
      const userSkills = await UserSkillsService.getLinkUserSkills(req.app.get('db'), id);
      res.status(200).json(userSkills);
    } catch (error) {
      next(error)
    }
  })


  module.exports = userSkillsRouter