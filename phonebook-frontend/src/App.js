// Part 3 phonebook frontend

import React, { useState,useEffect } from 'react'
import PbDataService from './services/phonebookdata'
import {FilterForm, PersonForm, Persons, Notification} from './components'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [newFilter, setNewFilter ] = useState('')
  const [errorOccured, setErrorOccured] = useState(true)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, isError) => {
    setNotification(message)
    setErrorOccured(isError)
    setTimeout(() => {
    setNotification(null)
    setNewName('')
    setNewNumber('')
  }, 4000)
}
  // Get phonebook from server
  useEffect(() => {
    PbDataService.getAll()
    .then(initialList => {
      setPersons(initialList)
    })
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }   
    const existingName = persons.find(person => person.name.toLowerCase()
     === newName.toLowerCase())

    if (existingName) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Do you want
      to replace the old number with a new one?`)
      // Update number information
      if (confirmUpdate) {
        const newInformation = {...existingName, number: newNumber}
        updateNumber(newInformation)
      }
    }
    else {
      // Add new person to server
      PbDataService.create(newPerson)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        showNotification(`Added ${newName}`, false)
      })
      .catch(error => {
        showNotification(error.response.data.error, true)
      })
    }
  }

  const updateNumber = person => {
    PbDataService.update(person.id, person)
    .then(updatedData => {
      setPersons(persons.map((p) => p.id !== person.id ? p : updatedData))
      showNotification(`Updated ${newName}'s number`, false)
    })
    .catch(error => {
       showNotification(`${person.name} was already removed from server`, true)
      })
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name} ?`)
    // Delete person from server
    if (confirmDelete) {
      const newList = persons.filter((person) => person.id !== id)
      PbDataService.deleteItem(id)
      .then(() => {
        setPersons(newList)
        showNotification(`Deleted ${name}`, false)
      })
      .catch(error => {
        showNotification(`Deleting ${name} failed`, true)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification errorOccured={errorOccured} message={notification} />

      <FilterForm newFilter={newFilter} filterData={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} changeName={handleNameChange} 
      changeNumber={handleNumberChange} addPerson={addPerson}/>

      <h2>Numbers</h2>
      <Persons filtered={newFilter === '' ? persons : 
      persons.filter((person) => 
      person.name.toLowerCase().includes(newFilter.toLowerCase()))}
      action={deletePerson}/>
    </div>
  )
}

export default App