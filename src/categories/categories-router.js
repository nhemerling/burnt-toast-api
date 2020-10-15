'use strict';

const express = require('express');
const {requireAuth} = require('../middleware/jwt-auth');
const CategoriesService = require('./categories-service');

const categoriesRouter = express.Router();

categoriesRouter.use(requireAuth);

categoriesRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const categories = await CategoriesService.getAllCategories(req.app.get('db'));
      res.send(categories);
    } catch (error) {
      next(error)
    }
  })

module.exports = categoriesRouter;