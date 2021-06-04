// Write your "projects" router here!

const express = require('express');

const {
  validateProject,
  validateProjectId,
} = require('../middleware/middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Project.get(req.query)
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(next)
});

router.get('/:id', validateProjectId, (req, res) => {

  res.json(req.projects)
});

router.post('/', validateProject, (req, res, next) => {

  Project.insert(req.projects)
  .then(projects => {
    res.status(201).json(projects);
  })
  .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {

  Project.update(req.params.id, req.body)
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(error => {
    next(error)
  });
});

router.delete('/:id', validateProjectId, (req, res, next) => {

  Project.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'The project has been nuked' });
  })
  .catch(next);
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {

  Project.getProjectActions(req.params.id)
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(next);
});


module.exports = router;
