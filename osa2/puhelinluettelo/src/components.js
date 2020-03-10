import React from 'react'

const FilterForm = ({newFilter, filterData}) => {
    return(
    <div>
      <div>filter shown with: <input value={newFilter} onChange={filterData}/></div>
    </div>
    ) 
  }
  
  const PersonForm = ({newName, newNumber, changeName, changeNumber, addPerson}) => {
    return(
      <form>
        <div>
          name: <input value={newName} onChange={changeName}/>
        </div>
        <div>number: <input value={newNumber} onChange={changeNumber}/></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
    )
  }
  
  const Persons = ({filtered}) => filtered.map((person) => 
  <Person key={person.name} name={person.name} number={person.number}/>)
  
  const Person = ({name, number}) => {
  return <p>{name} {number}</p>
  }

  export {
    FilterForm,
    PersonForm,
    Persons
  }
