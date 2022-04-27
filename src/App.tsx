import React, { useState, useEffect } from 'react'
import './App.css'

import AutoComplete from './components/AutoComplete'

const App = () => {
  const [countries, setCountries] = useState([])
  async function getCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all') // all the countries in the world :)
    return response.json()
  }

  useEffect(() => {
    getCountries().then(countriesObject => {
      setCountries(countriesObject.map((c: any) => {
        return c.name.common
      }))
    })
  }, [])

  return (
    <div className='App'>
      <div className='wrapper'>
        <AutoComplete data={countries} />
      </div>
    </div>
  )
}

export default App
