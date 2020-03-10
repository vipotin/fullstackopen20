//2.9* puhelinluettelo
import React, { useState } from 'react'

const Person = ({name, number}) => {
return <p>{name} {number}</p>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)

    let filteredList = persons

    if (filterValue !== '') {
      filteredList = persons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    }

    setFiltered(filteredList)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }   
    const nameIsIncluded = persons.some(person => person.name === newName)

    if (nameIsIncluded) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const updatedPersons = persons.concat(newPerson)
      setPersons(updatedPersons)
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <form>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filtered.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}
      </div>
    </div>
  )

}

export default App