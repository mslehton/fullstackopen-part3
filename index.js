const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.data(req,res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
  

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.format(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})


app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.put('/api/persons/:id', (request, response) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (req, res) => {
 // res.send('<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>'+new Date()+'</p>')
  Person
    .find({})
    .then(persons => {
      res.send('<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>'+new Date()+'</p>')
    })
})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(Person.format))
    })
})

app.post('/api/persons', (request, response) => {

  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  }
  if (body.number === undefined) {
    return response.status(400).json({error: 'number missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => {
      response.json(Person.format(savedPerson))
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
