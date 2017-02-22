import { default as React, PropTypes } from 'react'
import { default as compose } from 'recompose/compose'
import { default as withContext } from 'recompose/withContext'
import { default as withState } from 'recompose/withState'
import { default as withProps } from 'recompose/withProps'
import { default as withHandlers } from 'recompose/withHandlers'
import { default as branch } from 'recompose/branch'
import { default as renderComponent } from 'recompose/renderComponent'
import { default as renderNothingButChildren } from '../utils/compose/renderNothingButChildren'
import { default as omit } from 'lodash/fp'
import { default as GoogleMapDomReference } from './GoogleMapDomReference'
import { default as GoogleScriptLoader } from './GoogleScriptLoader'

export { default as Marker } from './GoogleMapMarker'
export { default as MarkerWithLabel } from './GoogleMapMarkerWithLabel'
export { default as InfoWindow } from './GoogleMapInfoWindow'
export { default as MarkerClusterer } from './GoogleMapMarkerClusterer'

const enhance = compose(
  withProps(
    props => omit(props, ['googleMapURL', 'mapOptions'])
  ),
  withState('google', 'updateGoogleObject', null),
  withState('map', 'updateMapObject', null),
  withHandlers({
    scriptLoaded: props => () => props.updateGoogleObject(g => window.google ? window.google : null),
    mapDomReady: props => map => props.updateMapObject(map),
  }),
  branch(
    props => !props.google,
    renderComponent(GoogleScriptLoader)
  )
)

const HOC = compose(
  withContext(
    {
      google: PropTypes.object,
      map: PropTypes.object
    },
    (props) => ({
      google: props.google,
      map: props.map
    })
  ),
  renderNothingButChildren
)()

export default enhance(({ google, map, mapOptions, mapDomReady, children }) => {
  const renderChildren = google && map ? children : null

  return (
    <HOC google={google} map={map}>
      <GoogleMapDomReference google={google} mapOptions={mapOptions} mapDomReady={mapDomReady} />
      {renderChildren}
    </HOC>
  )
})
