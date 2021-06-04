const Project = require('../projects/projects-model')
const Action = require('../actions/actions-model')


function validateProjectId(req, res, next) {
  console.log('validateProjectId middleware')
  Project.getById(req.params.id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          error: `project not found`
        })
      } else {
        req.project = project
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function validateProject(req, res, next) {
 
  const { name , description} = req.body
  if (
    !name || !description ||
    typeof name !== 'string' || 
    typeof description !== 'string'
  ) {
    // validation fails
    next({
      message: 'missing required name and description field',
      status: 400,
    })

  } else {
    req.project = { name: req.body.name.trim() }
    req.project = { name: req.body.description.trim() }
    next()
    // validation succeed
  }
}

function validateActionId(req, res, next) {
    console.log('validateActionId middleware')
    Action.getById(req.params.id)
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
   
    const { project_id , description, notes} = req.body
    if (
      !project_id || !description || !notes ||
      typeof project_id !== 'number' || 
      typeof description !== 'string' ||
      typeof notes !== 'string'
    ) {
      // validation fails
      next({
        message: 'missing required project id, notes and description field',
        status: 400,
      })
  
    } else {
      req.project = { name: req.body.description.trim() }
      req.project = { name: req.body.notes.trim() }
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