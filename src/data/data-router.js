const express = require('express');
const dataRouter = express.Router();

const DataService = require('./data-service');

dataRouter
  .route('/:user_id/highest_difficulty')
  .get((req, res, next) => {
    const { user_id } = req.params;
    DataService.getHighestDifficulty(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/total_attempts')
  .get((req, res, next) => {
    const { user_id } = req.params;
    DataService.getTotalAttempts(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/total_projects/:difficulty')
  .get((req, res, next) => {
    const { user_id, difficulty } = req.params;
    DataService.getTotalProjectsPerDifficulty(req.app.get('db'), user_id, difficulty)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/attempts_per_difficulty/:difficulty')
  .get((req, res, next) => {
    const { user_id, difficulty } = req.params;
    DataService.getAttemptsPerDifficulty(req.app.get('db'), user_id, difficulty)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

module.exports = dataRouter;