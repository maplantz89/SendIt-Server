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
  getProjectsPerDifficulty(db, user_id, difficulty){
    return db
      .from('climbs')
      .where({user_id: user_id, difficulty: difficulty})
      .count('difficulty As ' + difficulty);
  },
  getLastClimb(db, user_id){
    return db
      .from('climbs')
      .where({user_id})
      .orderBy('date', 'desc')
      .first();
  }
};

module.exports = DataService;