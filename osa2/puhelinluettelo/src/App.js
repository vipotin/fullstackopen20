//2.8 puhelinluettelo
import React, { useState } from 'react'

const Person = ({name, number}) => {
return <p>{name} {number}</p>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 123 4567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      <form>
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
        {persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}
      </div>
    </div>
  )

}

export default App