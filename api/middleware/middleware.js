const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')

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
 
  const { name , description} = req.body
  if ( !name || !description ) {
    // validation fails
    next({
      message: 'missing required name and description field',
      status: 400,
    })

  } else {
    req.projects = { name: req.body.name.trim() }
    req.projects = { name: req.body.description.trim() }
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
   
    const { project_id, description, notes, completed} = req.body
    if ( !description || !notes ||!completed) {
      // validation fails
      next({
        message: 'missing required project id, notes and description field',
        status: 400,
      })
  
    } else {
      req.action = { name: req.body.description.trim() }
      req.action = { name: req.body.notes.trim() }
      req.action = { name: req.body.project_id}
      next()
      // validation succeed
    }
  }

  
module.exports = {
  validateActionId,
  validateAction,
  validateProject,
  validateProjectId
}