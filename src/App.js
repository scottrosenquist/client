import React, { useState } from 'react'
import './App.css'
import Chart from './Chart'
import MyTable from './Table'
import Map from './Map'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

function App() {
  const [activeComponent, setActiveComponent] = useState('chart')

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage)
    setShowError(true)
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'chart':
        return <Chart onError={(error) => showErrorMessage(error)} />
      case 'table':
        return <MyTable onError={(error) => showErrorMessage(error)} />
      case 'map':
        return <Map onError={(error) => showErrorMessage(error)} />
      default:
        return <Chart onError={(error) => showErrorMessage(error)} />
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>How would you like to view your data?</p>
        <Button onClick={() => setActiveComponent('chart')}>Chart</Button>
        <Button onClick={() => setActiveComponent('table')}>Table</Button>
        <Button onClick={() => setActiveComponent('map')}>Map</Button>

        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          delay={10000}
          autohide
          style={{
            position: 'absolute',
            right: '10px',
          }}
        >
          <Toast.Header>
            <strong>Error</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
      </header>
      <div className='App-container'>{renderComponent()}</div>
    </div>
  )
}

export default App
