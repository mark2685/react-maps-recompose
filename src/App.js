import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import FaSpinner from 'react-icons/lib/fa/spinner'
import GoogleMap from './components/GoogleMap'
import { GOOGLE_MAP_KEY } from './constants/google-map-constants'

const Spinner = () => {
  return (
    <div style={{ height: `100%` }}>
      <FaSpinner style={{
        display: `block`,
        width: `80px`,
        height: `80px`,
        margin: `150px auto`,
        animation: `fa-spin 2s infinite linear`,
      }} />
    </div>
  )
}

class App extends Component {
  onReadyApp() {
    console.log('Boom! We\'re ready!')
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Google Maps</h2>
        </div>
        <GoogleMap
          onReady={this.onReadyApp.bind(this)}
          googleMapUrl={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`}
          loadingElement={<Spinner />} />
      </div>
    )
  }
}

export default App
