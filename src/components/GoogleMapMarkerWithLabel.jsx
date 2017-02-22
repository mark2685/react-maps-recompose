import { default as React, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as compose } from 'recompose/compose'
import { default as withState } from 'recompose/withState'
import { default as withProps } from 'recompose/withProps'
import { default as getContext } from 'recompose/getContext'
import { default as renderNothing } from 'recompose/renderNothing'
import { default as lifecycle } from 'recompose/lifecycle'
import { default as omit } from 'lodash/fp'
import { default as markerWithLabel } from 'markerwithlabel'

const MarkerWithLabel = compose(
  withProps(
    props => omit(props, [
      // Events
      'onClick',

      // Properties
      'crossImage',
      'handCursor',
      'icon',
      'labelAnchor',
      'labelClass',
      'labelContent',
      'labelInBackground',
      'labelStyle',
      'labelVisible',
      'position',
      'raiseOnDrag'
    ])
  ),
  withState('marker', 'updateMarker', null),
  getContext({
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    markerClusterer: PropTypes.object,
  }),
  lifecycle({
    componentDidMount: function() {
      const { marker, updateMarker } = this.props

      if (marker) {
        marker.setMap(null)
      }

      // Context
      const {
        google,
        map,
        markerClusterer
      } = this.props

      // Own Props
      const {
        crossImage,
        handCursor,
        icon,
        labelAnchor,
        labelClass,
        labelContent,
        labelInBackground,
        labelStyle,
        labelVisible,
        position,
        raiseOnDrag
      } = this.props

      // Events
      const { onClick } = this.props

      // MarkerWithLabel Config
      const config = {
        map,
        crossImage,
        handCursor,
        icon,
        labelAnchor,
        labelClass,
        labelContent,
        labelInBackground,
        labelStyle,
        labelVisible,
        position,
        raiseOnDrag
      }

      if (!google.maps.MarkerWithLabel) {
        google.maps.MarkerWithLabel = markerWithLabel(google.maps)
      }

      const _marker = new google.maps.MarkerWithLabel(config)

      if (markerClusterer) {
        markerClusterer.addMarker(_marker)
      }


      if (onClick) {
        _marker.addListener('click', onClick)
      }

      updateMarker(() => _marker)
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

export default MarkerWithLabel
