import { default as React, Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { camelize } from '../utils/String'
const eventNames = ['click', 'mouseover', 'recenter', 'dragend']

class Marker extends Component {
  renderMarker() {
    // NOTE: Should this functionality go into the render() method?
    const { map, google, markerClusterer, label, position } = this.props

    if (!google || !map) {
      return null
    }

    const config = { map, position, label }

    this.marker = new google.maps.Marker(config)

    if (markerClusterer) {
      markerClusterer.addMarker(this.marker)
    }

    eventNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e))
    })
  }

  handleEvent(evt) {
    return (e) => {
      const eventName = `on${camelize(evt)}`
      if (this.props[eventName]) {
        this.props[eventName](this.props, this.marker, e)
      }
    }
  }

  componentDidMount() {
    this.renderMarker()
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        if (this.marker) {
            this.marker.setMap(null)
        }
        this.renderMarker()
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      // TODO: Remove event listeners here.
      this.marker.setMap(null)
    }
  }

  render() {
    console.log('Marker.render')
    return null
  }
}

Marker.propTypes = {
  map: PropTypes.object,
  position: PropTypes.object.isRequired
}

eventNames.forEach(evt => Marker.propTypes[evt] = PropTypes.func)

export default Marker
