const express = require('express');
const usersRouter = express.Router();
const bodyParser = express.json();

const usersService = require('./users-service');

usersRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const { username, email, password } = req.body;
    for(const field of ['username', 'email', 'password'])
      if(!req.body[field])
        return res.status(400).json({
          error: `Missing ${field} in request body`
        });
    const passError = usersService.validatePassword(password);
    if(passError)
      return res.status(400).json({error: passError});
    
    usersService.validateEmail(req.app.get('db'), email)
      .then(validateEmail => {
        if(validateEmail)
          return res.status(400).json({error: 'Account with this email already exists.'});
      });
    return usersService.hashedPassword(password)
      .then(hashedPassword => {
        const newUser = {
          username, 
          email, 
          password: hashedPassword,
        };
        return usersService.insertUser(req.app.get('db'), newUser)
          .then(user => {
            res
              .status(201)
              .json(usersService.serializeUser(user));
          });
      })
      .catch(next);
  });


module.exports = usersRouter;