const Projects = require('../projects/projects-model')
const Actions = require('../actions/actions-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toLocaleString()}] ${req.method} to ${req.url}`)

  next();
}

function validateProjectId(req, res, next) {
  console.log('validateProjectId middleware')
  Projects.getById(req.params.id)
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


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateProject,
  validateProjectId
}