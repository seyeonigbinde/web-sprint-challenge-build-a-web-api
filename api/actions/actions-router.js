// Write your "actions" router here!

// Write your "projects" router here!

const express = require('express');

const {
  validateAction,
  validateActionId,
  validateProjectId
} = require('../middleware/middleware');

const Action = require('./actions-model');

const router = express.Router();


router.get('/', (req, res, next) => {
  Action.get(req.query)
  .then(action => {
    res.status(200).json(action);
  })
  .catch(next)
});


router.get('/:id', validateActionId, (req, res) => {

  res.json(req.action)
});


router.post('/', validateAction, validateProjectId, (req, res, next) => {

  Action.insert(req.action)
  .then(action => {
    res.status(201).json(action);
  })
  .catch(next);
});


router.put('/:id', validateActionId, validateAction, validateProjectId, (req, res, next) => {

  Action.update(req.params.id, req.body)
  .then(action => {
    res.status(200).json(action);
  })
  .catch(error => {
    next(error)
  });
});


router.delete('/:id', validateActionId, validateProjectId, (req, res, next) => {

  Action.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The action has been nuked' });
  })
  .catch(next);
});


module.exports = router;

