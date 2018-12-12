const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

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


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    },
    {
      "name": "Astia Hevonen",
      "number": "045-222222",
      "id": 6
    },
    {
      "name": "Arttu Puukko",
      "number": "33",
      "id": 7
    }
  ]
  
  const random = (n) => {
        return Math.floor(Math.random()*n)
  }

app.get('/api/persons/:id', (request, response) => {
	
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person =>person.id !== id)

  response.status(204).end()
})

app.get('/info', (req, res) => {
  res.send('<p>Puhelinluettelossa ' + persons.length + ' henkilön tiedot</p><p>'+new Date()+'</p>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (request, response) => {

  const person = JSON.parse(JSON.stringify(request.body))

  person.id = random(1000000)

  if (person.name === undefined) {
    return response.status(400).json({error: 'Pahus, nimi puuttuu'})
  }
  if (person.number === undefined) {
    return response.status(400).json({error: 'Voihan nenä, numero puuttuu'})
  }
  const found = persons.find(you => you.name === person.name)
  if(found) {
    return response.status(400).json({error: 'Hiisi vieköön, lisättävä nimi on jo luettelossa'})
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
