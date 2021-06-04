const express = require('express');

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();

server.use((req, res, next) => {
    console.log(`[${req.method}] ${req.path}`)
    next()
})
  
server.use(express.json());
  
server.use('/api/projects', projectsRouter); 
server.use('/api/actions', actionsRouter); 
  
  
server.use((err, req, res, next) => { // eslint-disable-line
    
    console.log('err handling middleware kicking in!', err.message)
    res.status(err.status || 500).json({
      custom: 'something exploded inside the app',
      message: err.message,
      stack: err.stack,
    })
});

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Projects DB!</h2>`);
});


module.exports = server;

