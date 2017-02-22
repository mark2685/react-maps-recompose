import { default as React, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as compose } from 'recompose/compose'
import { default as getContext } from 'recompose/getContext'
import { default as withState } from 'recompose/withState'
import { default as withHandlers } from 'recompose/withHandlers'
import { default as lifecycle } from 'recompose/lifecycle'

// InfoWindowOptions object (default)
const defaultInfoWindowOptions = {
  content: null,
  disableAutoPan: true,
  maxWidth: null,
  pixelOffset: null,
  position: null,
  zIndex: null,
}

// TODO: Set the events map.
// Event Map (default)
const eventsMap = {
  closeclick: 'onClose',
  content_changed: null,
  domready: null,
  position_changed: null,
  zindex_changed: null,
}

const enhance = compose(
  getContext({
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
  }),
  withState('infoWindow', 'updateInfoWindow', null),
  withState('infoWindowOptions', 'updateInfoWindowOptions', null),
  withHandlers({
    onClick: props => (event, marker, options) => {
      props.updateInfoWindowOptions({ marker, options })
    },
    onClose: ({ map, infoWindow }) => event => {
      infoWindow.close(map)
    },
  }),
  lifecycle({
    componentDidMount: function() {
      const { google, updateInfoWindow } = this.props

      const infoWindow = new google.maps.InfoWindow(defaultInfoWindowOptions)

      // Add Event Listeners
      Object.keys(eventsMap).forEach(eventName => {
        const eventMethod = eventsMap[eventName]
        if (this.props[eventMethod]) {
          google.maps.event.addListener(infoWindow, eventName, this.props[eventMethod]);
        }
      })

      updateInfoWindow(infoWindow)
    },
    componentWillReceiveProps: function(newProps) {
      const { map, infoWindow, infoWindowOptions } = newProps

      if (!infoWindow || !infoWindowOptions) { return null}

      const { options, marker } = infoWindowOptions

      infoWindow.setOptions(options)

      infoWindow.open(map, marker)
    },
    componentWillUnmount: function() {
      const { google, infoWindow } = this.props

      // Remove Event Listeners
      Object.keys(eventsMap).forEach(eventName => {
        const eventMethod = eventsMap[eventName]
        if (this.props[eventMethod]) {
          google.maps.event.addListener(infoWindow, eventName, this.props[eventMethod]);
        }
      })
    }
  })
)

const InfoWindow = enhance(({ children, onClick }) => {
  const childrenWithProps = React.Children.map(children,
    (child) => React.cloneElement(child, { onClick })
  )
  return (<div>{childrenWithProps}</div>)
})

export default InfoWindow
