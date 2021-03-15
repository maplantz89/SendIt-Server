const express = require('express');
const usersRouter = express.Router();
const bodyParser = express.json();

const usersService = require('./users-service');

usersRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = { username, email, password };
    usersService.insertUser(req.app.get('db'), newUser)
      .then(user => res.status(201).json(usersService.serializeUser(user)));
  });



module.exports = usersRouter;