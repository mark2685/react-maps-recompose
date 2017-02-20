import { default as React, Component } from 'react'
import { default as GoogleMap, Marker } from './components/GoogleMap'
import {
  GOOGLE_MAP_KEY,
  DEFAULT_ZOOM,
  DEFAULT_CENTER
} from './constants/google-map-constants'
import sampleData from './data/sample'

// const data = sampleData.listings

const mapOptions = {
  zoom: DEFAULT_ZOOM,
  center: DEFAULT_CENTER
}

const styles = {
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999
  }
}
export default class BasicMapExample extends Component {
  state = {
    data: sampleData.listings
  }

  addMore() {
    this.setState({ data: sampleData.coolSpotsAndNeighborhoodTours})
    // this.setState({ data: sampleData.listings.concat(sampleData.coolSpotsAndNeighborhoodTours)})
  }

  render() {
    const { data } = this.state
    console.log('BasicMapExample ', data.length)
    return (
      <div>
        <button style={styles.button} onClick={this.addMore.bind(this)}>Add More</button>
        <GoogleMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`}
          options={mapOptions}>
          {data.map(listing => {
            return (
              <Marker
                key={listing.id}
                position={{lat: listing.latitude, lng: listing.longitude}} />
            )
          })}
        </GoogleMap>
      </div>
    )
  }
}


// export default () => {
//
//   return (
//     <div>
//       <button onClick={}>Add More</button>
//       <GoogleMap
//         googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`}
//         options={mapOptions}>
//         {data.map(listing => {
//           return (
//             <Marker
//               key={listing.id}
//               position={{lat: listing.latitude, lng: listing.longitude}} />
//           )
//         })}
//       </GoogleMap>
//     </div>
//   )
// }
