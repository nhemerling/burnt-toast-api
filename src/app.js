'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const profilesRouter = require('./profiles/profiles-router');
const categoriesRouter = require('./categories/categories-router');
const skillsRouter = require('./skills/skills-router');

const app = express();

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  })
);
app.get('/', (req, res) => {
  res.send('Hello, burnt_toast'); //TODO: make this self-documenting API
});

app.use(cors());
app.use(helmet());
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/skills', skillsRouter);

app.use(errorHandler);

module.exports = app;
