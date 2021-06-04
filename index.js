require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const server = require('./api/server');

server.use(express.json())
server.use(cors())

if (process.env.NODE_ENV === 'production') {
  console.log('This means this code is deployed')
}

const PORT = process.env.PORT || 4000

console.log('port is -> ', PORT)

server.use((req, res) => {
  res.status(404).json({ message: 'Projects not found' })
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
