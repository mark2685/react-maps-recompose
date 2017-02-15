import { default as React, Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import GoogleMapAsyncLoader from './GoogleMapAsyncLoader'
import { DEFAULT_ZOOM, DEFAULT_CENTER } from '../constants/google-map-constants'

const mapStyles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}

const LOADING_STATE_NONE   = `LOADING_STATE_NONE`
const LOADING_STATE_LOADED = `LOADING_STATE_LOADED`

export default class GoogleMap extends Component {
  static defaultProps = {
    mapOptions: {
      zoom: DEFAULT_ZOOM,
      center: DEFAULT_CENTER
    }
  }

  static propTypes = {
    googleMapUrl: PropTypes.string.isRequired,
    loadingElement: PropTypes.element.isRequired,
    onReady: PropTypes.func,
    google: PropTypes.object,
    map: PropTypes.object,
    mapOptions: PropTypes.object
  }

  state = {
    loading: LOADING_STATE_NONE
  }

  loadMap() {
    this.setState({
      loading: LOADING_STATE_LOADED,
      google: window.google
    })

    const { google } = this.state
    const { mapOptions, onReady } = this.props

    const mapRef = this.refs.map
    const node = ReactDOM.findDOMNode(mapRef)

    this.map = new google.maps.Map(node, mapOptions)

    // evtNames.forEach(e => {
    //   this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
    // })

    google.maps.event.trigger(this.map, 'ready')

    if (onReady) {
      onReady()
    }

    this.forceUpdate()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { loading:nextLoading } = nextState
  //   const { loading:prevLoading } = this.state
  //
  //   if (prevLoading !== nextLoading && prevLoading !== LOADING_STATE_LOADED) {
  //     this.renderChildren()
  //
  //     return true
  //   }
  //
  //   return false
  // }

  componentDidUpdate(prevProps, prevState) {}

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

  renderChildren() {
    const { children } = this.props

    if (!children) {
      return false
    }

    const { map } = this
    const { google } = this.state

    if (!map || !google) {
      return false
    }

    return React.Children.map(children, child => {
      return React.cloneElement(child, { map, google, })
    })
  }

  render() {
    const { loading } = this.state

    if (loading !== LOADING_STATE_LOADED) {
      const { googleMapUrl, loadingElement } = this.props

      return (
        <GoogleMapAsyncLoader
          googleMapUrl={googleMapUrl}
          loadingElement={loadingElement}
          onReady={this.loadMap.bind(this)} />
      )
    }

    return (
      <div style={mapStyles.container}>
        <div ref='map' style={mapStyles.map}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
