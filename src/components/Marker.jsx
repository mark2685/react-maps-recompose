import { default as React, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as compose } from 'recompose/compose'
import { default as onlyUpdateForKeys } from 'recompose/onlyUpdateForKeys'
import { default as withState } from 'recompose/withState'
import { default as getContext } from 'recompose/getContext'
// import { default as createSink } from 'recompose/createSink'
import { default as renderNothing } from 'recompose/renderNothing'
import { default as lifecycle } from 'recompose/lifecycle'

const enhance = compose(
  withState('marker', 'updateMarker', null),
  getContext({
    google: PropTypes.object,
    map: PropTypes.object,
  }),
  onlyUpdateForKeys(['google', 'map']),
  lifecycle({
    componentDidMount: function() {
      console.log('1.componentDidMount', this.props)

      const { google, map, marker, position, updateMarker } = this.props

      if (marker) {
        marker.setMap(null)
      }

      const config = { map, position }

      const freshMarker = new google.maps.Marker(config)

      updateMarker(freshMarker)
    },
    componentWillUnmount: function() {

      // TODO: Figure out why the marker is always NULL here, might have to remove 'lifecycle' as it seems buggy.

      const { marker } = this.props

      console.log('2. componentWillUnmount', this)

      if (marker) {
        console.log('\n\nFOUND!\n\n')
        // TODO: Remove event listeners here.
        marker.setMap(null)
      }
    }
  }),
  renderNothing
)()

// const Marker = createSink(({ google, map, marker, updateMarker, position }) => {
//   const config = { map, position }
//
//   const _marker = new google.maps.Marker(config)
//
//   updateMarker(_marker)
// })

export default enhance
