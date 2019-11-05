const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const bodyParser = express.json();

authRouter
  .route('/login')
  .post(bodyParser, (req, res, next) => {
    const { username, password } = req.body;
    const loginUser = { username, password };
    for(const[key, value] of Object.entries(loginUser))
      if(value === null)
        return res.status(400).json({
          error: `Missing ${key} is request body`
        });
    AuthService.getUserWithUsername(req.app.get('db'), loginUser.username)
      .then(user => {
        if(!user)
          return res.status(400).json({error: 'Incorrect username or password'});
        return AuthService.comparePasswords(loginUser.password, user.password)
          .then(compare => {
            if(!compare)
              return res.status(400).json({
                error: 'Incorrect username or password'
              });
            const sub = user.username;
            const payload = {
              id: user.id,
              username: user.username
            };
            res.send({
              authToken: AuthService.createJwt(sub, payload),
              id: user.id
            });
          });
      })
      .catch(next);
  });

module.exports = authRouter;

