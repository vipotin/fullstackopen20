import React from 'react'

const CountryListItem = ({country, action}) => {
    return (
      <div>
        {country.name}
        <button id={country.name} onClick={() => action(country)}>show</button>
      </div>
    )
  }
  
  const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>{country.capital}</p>
        
        <h2>languages</h2>
        <ul>
          {country.languages.map((language) => 
          <li key={language.name}>{language.name}</li>)}
        </ul>
  
        <img src={country.flag} height="30%" width="30%" alt={`Flag of ${country.name}`}/>
      </div>
    )
  }
  
  const Countries = ({data, limitExceeded, action}) => {
    // Show single view
    if (data.length === 1) {
      return <Country country={data[0]} />
    }
  
    // Show list view
    const result = limitExceeded ? <p>Too many matches, specify another filter</p> : data.map((country) => <CountryListItem key={country.name} country={country} action={action} />)
    return result
  }

  export default Countries