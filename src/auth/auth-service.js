const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
  getUserWithUsername(db, username){
    return db('users')
      .where({username})
      .first();
  },
  comparePasswords(password, hash){
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload){
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256'
    });
  },
  verify(token){
    return jwt.verify(token, config.JWT_SECRET, {
      algorithm: ['HS256'],
    });
  }
};

module.exports = AuthService;