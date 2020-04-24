import { useEffect } from 'react'
import axios from 'axios'

export const useCountry = (country) => {
  const countryUrl = 'https://restcountries.eu/rest/v2/name/aruba?fullText=true'
  const countryData = axios.get(countryUrl)
  console.log(countryData)
}