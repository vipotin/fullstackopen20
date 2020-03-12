// 2.12* maiden tiedot

import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({name}) => <p>{name}</p>

const Countries = ({data, limitExceeded}) => {
  const result = limitExceeded ? <p>Too many matches, specify another filter</p> : data.map((country) => <Country key={country.name} name={country.name} />)
  console.log(limitExceeded)
  return result
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [limitExceeded, setLimitExceeded] = useState(false)
  const countryLimit = 10

  useEffect(() => {
    console.log('event')
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  },[])

  const handleFilterChange = event => {
    const newFilter = event.target.value

    let filtered = countries
    if (newFilter !== '') {
      filtered = countries.filter((country) => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    }

    setFilteredCountries(filtered)

    let tooMany = filtered.length > countryLimit ? true : false
    setLimitExceeded(tooMany)
  }

  return (
    <div>
      <div>find countries <input 
      onChange={handleFilterChange}></input></div>
      <div>
        <Countries data={filteredCountries} limitExceeded={limitExceeded} />
      </div>
    </div>
  );
}

export default App;
