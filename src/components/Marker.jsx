import { default as React, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as compose } from 'recompose/compose'
import { default as withState } from 'recompose/withState'
import { default as getContext } from 'recompose/getContext'
import { default as renderNothing } from 'recompose/renderNothing'
import { default as lifecycle } from 'recompose/lifecycle'

const Marker = compose(
  withState('marker', 'updateMarker', null),
  getContext({
    google: PropTypes.object,
    map: PropTypes.object,
  }),
  lifecycle({
    componentDidMount: function() {
      if (this.props.marker) {
        this.props.marker.setMap(null)
      }

      const { google, map, marker, position, updateMarker } = this.props

      const config = { map, position }

      updateMarker(() => {
        return new google.maps.Marker(config)
      })
    },
    componentWillUnmount: function() {
      if (this.props.marker) {
        // TODO: Remove event listeners here.
        this.props.marker.setMap(null)
      }
    }
  }),
  renderNothing
)()

export default Marker
