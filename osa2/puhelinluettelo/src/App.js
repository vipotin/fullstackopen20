//2.10 puhelinluettelo

import React, { useState } from 'react'
import {FilterForm, PersonForm, Persons} from './components'

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
  const [ filterData, setFilterData ] = useState(persons)


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = event => {
    handleFilterChange(event.target.value)
    updatePersonList(event.target.value, persons)
  }

  const handleFilterChange = value => {
    setNewFilter(value)
  }

  const updatePersonList = (filter, personList) => {  
    let filteredList = personList
    if (filter !== '') {
      filteredList = personList.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    }

    setFilterData(filteredList)
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
      updatePersonList(newFilter, updatedPersons)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} filterData={filterPersons} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} changeName={handleNameChange} 
      changeNumber={handleNumberChange} addPerson={addPerson}/>

      <h2>Numbers</h2>
      <Persons filtered={filterData}/>
    </div>
  )

}

export default App