// 2.13* maiden tiedot

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './components'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [limitExceeded, setLimitExceeded] = useState(false)
  const countryLimit = 10

  useEffect(() => {
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
  
  const showCountryInformation = (country) => {
    setFilteredCountries([country])
  }

  return (
    <div>
      <div>find countries <input 
      onChange={handleFilterChange}></input></div>
      <div>
        <Countries data={filteredCountries} limitExceeded={limitExceeded} action={showCountryInformation} />
      </div>
    </div>
  );
}

export default App;
