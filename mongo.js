const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url0 = 'mongodb://puuhevonen:S1lainen@ds161136.mlab.com:61136/fullstack-persons'
const url = process.env.MONGODB_URI

mongoose.connect(url,{ useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(process.argv.length<4) {
  console.log('Puhelinluettelo:')
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person.name,' ',person.number)
    })
    mongoose.connection.close()
  })
}
else {
  const name = process.argv[2]
  const number = process.argv[3]
  const person= new Person({
    name: name,
    number: number
  })

  person
    .save()
    .then(response => {
      console.log('Lisätään henkilö',name,'numero',number,'luetteloon')
      mongoose.connection.close()
    })
  }