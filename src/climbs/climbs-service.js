const ClimbsService = {
  getClimbs(db, id){
    return db 
      .from('climbs')
      .select('*')
      .where({'user_id' : id});
  },
  getClimbById(db, climb_id){
    return db
      .from('climbs')
      .where({'id': climb_id});
  },
  insertClimb(db, newClimb){
    return db
      .insert(newClimb)
      .into('climbs')
      .returning('*')
      .then(rows=> {
        return rows[0];
      });
  },
  updateClimb(db, climb_id, updatedClimb){
    return db('climbs')
      .where({id : climb_id})
      .update(updatedClimb); 
  }
};

module.exports = ClimbsService;