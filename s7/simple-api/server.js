const express = require('express')
const bodyParser = require('body-parser')

const kittenRouter = require('./routers/kitten-router')

const app = express()

/*
  kitten
  {id:1, name: 'some string', color: 'some string', weight: 10}
*/ 
app.use((req, res, next) => {
  console.log(req.url + ' was requested')
  next()
})

app.use((req, res, next) => {
  console.warn(req.headers)
  if (req.headers['kitten-token'] === 'kittensecret'){
    next()
  } else {
    res.status(401).json({ message: 'you need the secret key' })
  }
})

app.use(bodyParser.json())

app.locals.kittens = []

for (let i = 0; i < 100; i++) {
  app.locals.kittens.push({
    id: i, 
    name: 'kitten ' + i, 
    color: 'some color', 
    weight: i % 10
  })
}

app.use('/kitten-api', kittenRouter)


app.listen(8080)