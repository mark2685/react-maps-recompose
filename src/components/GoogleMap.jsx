import { default as React, Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapAsyncLoader from './GoogleMapAsyncLoader'
import './GoogleMap.css'
const LOADING_STATE_NONE   = `LOADING_STATE_NONE`
const LOADING_STATE_LOADED = `LOADING_STATE_LOADED`

class GoogleMap extends Component {
  static defaultProps = {
    title: 'React Google Maps'
  }

  static propTypes = {
    googleMapUrl: PropTypes.string.isRequired,
    loadingElement: PropTypes.element.isRequired,
    onReady: PropTypes.func
  }

  state = {
    loading: LOADING_STATE_NONE
  }

  onReady() {
    this._gapi = window.google

    this.setState({
      loading: LOADING_STATE_LOADED,
      google: this._gapi
    })

    this.loadMap()
  }

  loadMap() {
    const { google } = this.state

    const mapRef = this.refs.map
    const node = ReactDOM.findDOMNode(mapRef)

    this.map = new google.maps.Map(node, {
      zoom: 4,
      center: { lat: -25.363, lng: 131.044 }
    })

    // evtNames.forEach(e => {
    //   this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
    // })

    google.maps.event.trigger(this.map, 'ready')
  }

  componentDidMount() {
    const { loading } = this.state

    if (loading !== LOADING_STATE_LOADED) {
      return
    }

    this.loadMap()
  }

  componentWillUnmount() {
    /**
     * Remove any event listeners here.
     */
  }

  render() {
    const { loading } = this.state

    if (loading !== LOADING_STATE_LOADED) {
      const { googleMapUrl, loadingElement } = this.props

      return (
        <GoogleMapAsyncLoader
          googleMapUrl={googleMapUrl}
          loadingElement={loadingElement}
          onReady={this.onReady.bind(this)} />
        )
    }

    return (
      <div ref='map' className={`map`}/>
    )
  }
}

export default GoogleMap
