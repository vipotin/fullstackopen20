import React from 'react'

const FilterForm = ({newFilter, filterData}) => {
    return(
    <div>
      <div>
        <label>filter shown with: </label>
        <input value={newFilter} onChange={filterData}/></div>
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
  
  const Persons = ({filtered, action}) => filtered.map((person) => 
  <Person key={person.name} name={person.name} 
  number={person.number} id={person.id} action={action}/>)
  
  const Person = ({name, number, id, action}) => {
  return (
    <div>
      {name} {number} <></>
      <button onClick={() => action(id, name)}>delete</button>
      </div>
  )
  }

  export {
    FilterForm,
    PersonForm,
    Persons
  }
