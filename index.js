/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Pull your server into this file and start it!
*/


require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const server = express()

server.use(express.json())
server.use(cors())

console.log(process.env.USER) 
console.log(process.env.SHELL)

if (process.env.NODE_ENV === 'production') {
  console.log('this means this code is deployed')
}

const PORT = process.env.PORT || 4000

console.log('port is -> ', PORT)

server.get('/api/projects', (req, res) => {
  res.json({ message: `${process.env.COHORT} ROCKS` })
})

server.use((req, res) => {
  res.status(404).json({ message: 'not found sorry' })
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})