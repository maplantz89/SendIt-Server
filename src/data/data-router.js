const express = require('express');
const dataRouter = express.Router();

const DataService = require('./data-service');

dataRouter
  .route('/:user_id/highest_difficulty')
  .get((req, res, next) => {
    const {
      user_id
    } = req.params;
    DataService.getHighestDifficulty(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/total_attempts')
  .get((req, res, next) => {
    const {
      user_id
    } = req.params;
    DataService.getTotalAttempts(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/total_projects')
  .get((req, res, next) => {
    const {
      user_id
    } = req.params;
    let projects = [];
    for (let i = 0; i < 11; i++) {
      DataService.getProjectsPerDifficulty(req.app.get('db'), user_id, i)
        .then(result => {
          projects.push(result[0]);
          console.log('projects', projects);
        });
    }
    console.log('projects', projects);
    return projects;
  });

dataRouter
  .route('/:user_id/last_climb')
  .get((req, res, next) => {
    const {
      user_id
    } = req.params;
    DataService.getLastClimb(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

dataRouter
  .route('/:user_id/by_diff')
  .get((req, res, next) => {
    const { user_id } = req.params;
    DataService.getProjectsPerDifficulty(req.app.get('db'), user_id)
      .then(result => {
        return res.json(result);
      })
      .catch(next);
  });

module.exports = dataRouter;