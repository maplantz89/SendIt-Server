const express = require('express');
const climbsRouter = express.Router();
const bodyParser = express.json();

const ClimbsService = require('./climbs-service');

climbsRouter
  .route('/:user_id')
  .get((req, res, next) => {
    const {
      user_id
    } = req.params;
    ClimbsService.getClimbs(req.app.get('db'), user_id)
      .then(climbs => {
        return res.json(climbs);
      })
      .catch(next);
  })

  .post(bodyParser, (req, res, next) => {
    const {
      user_id
    } = req.params;
    const {
      attempts,
      date,
      location,
      video,
      favorite,
      difficulty
    } = req.body;
    const newClimb = {
      user_id,
      attempts,
      date,
      location,
      video,
      favorite,
      difficulty
    };
    const requiredFields = {
      attempts,
      location,
      difficulty
    };
    for (const [key, value] of Object.entries(requiredFields))
      if (value === null)
        return res.status(401).json({
          error: `Missing ${key} from request body`
        });
    ClimbsService.insertClimb(req.app.get('db'), newClimb)
      .then(newClimb => {
        res.status(201).json(newClimb);
      })
      .catch(next);
  });

climbsRouter
  .route('/:climb_id')
  .get((req, res, next) => {
    const {
      climb_id
    } = req.params;
    ClimbsService.getClimbById(req.app.get('db'), climb_id)
      .then(climbs => {
        return res.json(climbs);
      })
      .catch(next);
  })

  .patch(bodyParser, (req, res, next) => {
    const {
      climb_id
    } = req.params;
    const {
      attempts,
      date,
      location,
      video,
      favorite,
      difficulty
    } = req.body;
    const updatedClimb = {
      attempts,
      date,
      location,
      video,
      favorite,
      difficulty
    };
    ClimbsService.updateClimb(req.app.get('db'), climb_id, updatedClimb)
      .then(updatedClimb => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = climbsRouter;