import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  console.log(process.env.REACT_APP_API_URL)
  const [poi, setPoi] = useState([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/poi')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setPoi(result)
        },
        (error) => {
          //setPoi('Error')
        }
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>poi</p>
        <div>
          {poi.map((pois, index) => (
            <div key={index}>{pois.name}</div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default App
