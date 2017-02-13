import React, { Component } from 'react'
import FaSpinner from 'react-icons/lib/fa/spinner'
import GoogleMap from './components/GoogleMap'
import MarkerClusterer from './components/MarkerClusterer'
import Marker from './components/Marker'
import { GOOGLE_MAP_KEY } from './constants/google-map-constants'
import sampleData from './data/sample'

const data = sampleData.listings

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
    // const options = {}
    return (
      <GoogleMap
        onReady={this.onReadyApp.bind(this)}
        googleMapUrl={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`}
        loadingElement={<Spinner />}>
        <MarkerClusterer>
          {data.map(listing => {
            return (
              <Marker
                key={listing.id}
                position={{lat: listing.latitude, lng: listing.longitude}} />
            )
          })}
        </MarkerClusterer>
      </GoogleMap>
    )
  }
}

export default App
