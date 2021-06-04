// Write your "actions" router here!

// Write your "projects" router here!

const express = require('express');

const {
  validateAction,
  validateActionId,
  validateProjectId,
} = require('../middleware/middleware');

const Action = require('./actions-model');

const router = express.Router();


router.get('/', (req, res, next) => {
  Action.get(req.query.length)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(next)
});


router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
});


router.post('/', validateAction, validateProjectId, (req, res, next) => {

const postAction = { ...req.body };
    Action.insert(postAction)
        .then(({id}) => {
            return Action.get(id)
        })
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            next(error)
        });
});


router.put('/:id', validateActionId, validateAction, (req, res, next) => {

  Action.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action);
     })
    .catch(error => {
        next(error)
    });
});


router.delete('/:id', validateActionId, (req, res, next) => {

  Action.remove(req.params.id)
    .then(() => {
        res.status(200).json({ message: 'The action has been nuked' });
    })
    .catch(next);
});


module.exports = router;

