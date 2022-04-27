import React, { useState, useEffect } from 'react'
import './App.css'

import AutoComplete from './components/AutoComplete'

const App = () => {
  const [countries, setCountries] = useState(['Romania', 'United Kingdom', 'United States'])

  return (
    <div className='App'>
      <div className='wrapper'>
        <AutoComplete data={countries} />
      </div>
    </div>
  )
}

export default App
