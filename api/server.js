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
    res.send(`<h2>Let's write some middleware!</h2>`);
  });
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;

