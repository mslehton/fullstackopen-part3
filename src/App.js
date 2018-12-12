import React from 'react';
import personService from './services/persons'


 const Lista = (props) => (
 <div>
        <h3>Numerot</h3>
        <table>
		<tbody>
		{props.persons.map(person => <Henkilo person={person} key={person.name} f={props.f}/>)}
        </tbody>
		</table>
</div>
)

const Henkilo = (props) => (
	<tr key={props.person.name}><td>{props.person.name}</td><td>{props.person.number}</td><td><button onClick={props.f(props.person.id,props.person.name)}>Poista</button></td></tr>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="Notification">
      {message}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
	  persons: [],
      newName: '',
	  newNumber: '',
	  filter: '',
	  notification: null
    }
  }
  
  
	componentDidMount() {
		personService
		.getAll()
		.then(response => {
			this.setState({persons: response.data})
		})
	}
  
  
	findStr = (persons,str) =>{

		for (let i=0; i < persons.length; i++) {
			if (persons[i].name===str) {
			//	console.log("found ",i)
				return i
			}
		}

		return -1;
	}

	
	addPerson = (event) => {

		event.preventDefault()
		let index = this.findStr(this.state.persons,this.state.newName)
		const personObject = {
			name: this.state.newName,
			number: this.state.newNumber
			//	id: this.state.newName
		}
		
		if(index<0) {

			personService
			.create(personObject)
			.then(response => {
				this.setState({
					persons: this.state.persons.concat(response.data),
					newName: '',
					newNumber: '',
					notification: 'Lisättiin ' + this.state.newName
				})
			})
		}
		else if(window.confirm(this.state.newName+" on jo luettelossa. Korvataanko vanha numero uudella?")) {
			
			const id = this.state.persons[index].id
				console.log("muutetaan ",id)
			personService
			.update(id,personObject)
			.then(response => {
				this.setState({
					persons: this.state.persons.map(person => person.id !== id ? person : response.data),
					newName: '',
					newNumber: '',
					notification: 'Muokattiin ' + this.state.newName
				})
			})
			.catch(error => {
				personService
				.create(personObject)
				.then(response => {
					this.setState({
						persons: this.state.persons.map(person => person.id !== id ? person : response.data),
						newName: '',
						newNumber: '',
						notification: 'Muokattiin ' + this.state.newName
					})
				})
			})
		}
		else {
			return
		}
		setTimeout(() => {
			this.setState({notification: null})
		}, 5000)
	}
  
  
	removePerson = (id,name) => (
	() =>  {

		if(window.confirm('Poistetaanko '+name+'?')) {
			personService
			.remove(id)
			.then(response => {

				this.setState({
					persons: this.state.persons.filter(person => person.id !== id),
					newName: '',
					newNumber: '',
					notification: 'Poistettiin ' + name
				})
			})
		}
		setTimeout(() => {
			this.setState({notification: null})
		}, 5000)
	})
  
  
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value.toLowerCase() })
	
  }  
  
  
  render() {
	const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().indexOf(this.state.filter)>=0)
	   
    return (
      <div>
        <h2>Puhelinluettelo</h2>
		<Notification message={this.state.notification}/>
		rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}/>
		<h3>Lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            Nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
			<br/>
			Puhelinnumero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
			<br/>
            <button type="submit">lisää</button>
          </div>
        </form>
		<Lista persons={filteredPersons} filter={this.state.filter} f={this.removePerson}/>
      </div>
    )
  }
}

export default App