const bcrypt = require('bcryptjs');

const UsersService = {
  validatePassword(password){
    if (password.length < 8) {
      return 'Password be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    return null;
  },
  hashedPassword(password){
    return bcrypt.hash(password, 12);
  },
  validateEmail(db, email){
    return db('users')
      .where({email})
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser){
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  serializeUser(user){
    return { 
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
};

module.exports = UsersService;