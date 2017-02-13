import { default as React, Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars

export default class Marker extends Component {
  static propTypes = {
    map: PropTypes.object,
    position: PropTypes.object.isRequired
  }

  renderMarker() {
    const { map, google, label, position } = this.props

    if (!google || !map) {
      return null
    }

    const config = { map, position, label }

    this.marker = new google.maps.Marker(config)
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
      this.marker.setMap(null)
    }
  }

  render() {
    return null
  }
}
