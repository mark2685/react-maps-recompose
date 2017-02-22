import { default as React, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as compose } from 'recompose/compose'
import { default as withState } from 'recompose/withState'
import { default as withProps } from 'recompose/withProps'
import { default as getContext } from 'recompose/getContext'
import { default as renderNothing } from 'recompose/renderNothing'
import { default as lifecycle } from 'recompose/lifecycle'
import { default as omit } from 'lodash/fp'

const Marker = compose(
  withProps(
    props => omit(props, ['content', 'position', 'onClick'])
  ),
  withState('marker', 'updateMarker', null),
  getContext({
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    markerClusterer: PropTypes.object,
  }),
  lifecycle({
    componentDidMount: function() {
      if (this.props.marker) {
        this.props.marker.setMap(null)
      }

      // props
      const {
        google,
        map,
        markerClusterer,
        content,
        position,
        updateMarker
      } = this.props

      // events
      const { onClick } = this.props

      const config = { map, position }

      const marker = new google.maps.Marker(config)

      if (markerClusterer) {
        markerClusterer.addMarker(marker)
      }

      if (onClick) {
        marker.addListener('click', (event) => onClick(event, marker, {
          content, position
        }))
      }

      updateMarker(() => {
        return marker
      })
    },
    componentWillUnmount: function() {
      // props
      const { marker, google, markerClusterer } = this.props

      if (marker) {
        google.maps.event.clearListeners(marker, 'click')

        if (markerClusterer) {
          markerClusterer.removeMarker(marker)
        }

        marker.setMap(null)
      }
    }
  }),
  renderNothing
)()

export default Marker
