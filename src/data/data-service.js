const DataService = {
  getHighestDifficulty(db, user_id){
    return db 
      .from('climbs')
      .where({user_id})
      .orderBy('difficulty', 'desc')
      .first();
  },
  getTotalAttempts(db, user_id){
    return db 
      .from('climbs')
      .where({user_id})
      .sum('attempts As attempts')
      .first();
  },
  getTotalProjectsPerDifficulty(db, user_id, difficulty){
    return db
      .from('climbs')
      .where({user_id: user_id, difficulty: difficulty})
      .as('projects')
      .count('attempts As projects_per_difficulty')
      .first();
  },
  getAttemptsPerDifficulty(db, user_id, difficulty){
    return db
      .from('climbs')
      .where({user_id: user_id, difficulty: difficulty})
      .as('projects')
      .sum('attempts As attempts_per_difficulty')
      .first();
  }
};

module.exports = DataService;