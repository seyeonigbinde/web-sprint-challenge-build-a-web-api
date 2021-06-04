const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')

function logger(req, res, next) {

    console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.url}`)
  
    next();
  }

function validateProjectId(req, res, next) {
  console.log('validateProjectId middleware')
  Project.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          error: `project not found`
        })
      } else {
        req.projects = project
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateProject(req, res, next) {
 
  const { name , description, completed} = req.body
  if ( !name || !description || !completed) {
    // validation fails
    next({
      message: 'missing required name and description field',
      status: 400,
    })

  } else {
    req.projects = { name: req.body.name.trim() }
    req.projects = { name: req.body.description.trim() }
    req.projects = { name: req.body.completed }
    next()
    // validation succeed
  }
}

function validateActionId(req, res, next) {
    console.log('validateActionId middleware')
    Action.get(req.params.id)
      .then(action => {
        if (!action) {
          res.status(404).json({
            error: `action not found`
          })
        } else {
          req.action = action
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }
  
  function validateAction(req, res, next) {
   
    const { description, notes, completed} = req.body
    if ( !description || !notes ||!completed) {
      // validation fails
      next({
        message: 'missing required project id, notes and description field',
        status: 400,
      })
  
    } else {
      req.action = { description: req.body.description.trim() }
      req.action = { notes: req.body.notes.trim() }
      req.action = { completed: req.body.completed }
      next()
      // validation succeed
    }
  }

  
module.exports = {
    logger,
  validateActionId,
  validateAction,
  validateProject,
  validateProjectId
}