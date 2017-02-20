import React, { Component } from 'react'
import FaSpinner from 'react-icons/lib/fa/spinner'
import GoogleMap from './components/GoogleMap'
import MarkerClusterer from './components/MarkerClusterer'
import Marker from './components/Marker'
import InfoWindow from './components/InfoWindow'
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
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  onReadyApp() {
    console.log('Boom! We\'re ready!')
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
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
                onClick={this.onMarkerClick.bind(this)}
                position={{lat: listing.latitude, lng: listing.longitude}} />
            )
          })}
        </MarkerClusterer>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose.bind(this)}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </GoogleMap>
    )
  }
}

export default App
