const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url,{ useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

 personSchema.statics.format = function(person) {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }

const Person0 = mongoose.model('Person0', {
  name: String,
  number: String
})

const Person = mongoose.model('Person',personSchema)

module.exports = Person