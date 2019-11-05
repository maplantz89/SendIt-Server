require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { NODE_ENV } = require('./config');
const climbsRouter = require('./climbs/climbs-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const dataRouter = require('./data/data-router');

const app = express();

const morganOptions = (NODE_ENV === 'production')
  ? 'common' 
  : 'dev';

app.use(morgan(morganOptions));
app.use(cors());

app.use('/api/data', dataRouter);
app.use('/api/climbs', climbsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use(function errorHandler(error, req, res, next) { //eslint-disable-line no-unused-vars
  let response;
  if(NODE_ENV === 'production'){
    response = { error: {message: 'server error'} };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
