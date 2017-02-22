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
  }),
  lifecycle({
    componentDidMount: function() {
      if (this.props.marker) {
        this.props.marker.setMap(null)
      }

      // props
      const { google, map, content, position, updateMarker } = this.props

      // events
      const { onClick } = this.props

      const config = { map, position }

      const marker = new google.maps.Marker(config)

      updateMarker(() => {
        return marker
      })

      if (onClick) {
        marker.addListener('click', (event) => onClick(event, marker, {
          content, position
        }))
      }
    },
    componentWillUnmount: function() {
      // props
      const { marker, google } = this.props

      if (this.props.marker) {
        google.maps.event.clearListeners(marker, 'click')

        this.props.marker.setMap(null)
      }
    }
  }),
  renderNothing
)()

export default Marker
