const express = require('express');
const path = require('path');
const UserService = require('./users-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

//userRouter.use(requireAuth);
userRouter
  .route('/')
  .post(jsonBodyParser, async (req, res, next) => {
    const { full_name, username, password, email, zip } = req.body;

    for (const field of ['username', 'password', 'full_name', 'email']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body`,
        });
      }
    }

    try {
      const passwordError = UserService.validatePassword(password);

      if (passwordError) return res.status(400).json({ error: passwordError });

      const hasUserWithUserName = await UserService.hasUserWithUserName(
        req.app.get('db'),
        username
      );

      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      const hashedPassword = await UserService.hashPassword(password);

      const newUser = {
        username,
        hashed_pass: hashedPassword,
      };

      const user = await UserService.insertUser(req.app.get('db'), newUser);
      const user_profile = {
        fk_user_id: user.id,
        full_name,
        email,
        zip,
      };
      await UserService.createInitialProfile(req.app.get('db'), user_profile);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${user.id}`))
        .json(UserService.serializeUser(user));
    } catch (error) {
      next(error);
    }
  })
  .delete(requireAuth, async (req, res, next) => {
    const id = req.user.id;
    try {
      await UserService.deleteUser(req.app.get('db'), id);
      res.status(200).send('Deleted user');
    } catch (error) {
      next(error);
    }
  });

module.exports = userRouter;
