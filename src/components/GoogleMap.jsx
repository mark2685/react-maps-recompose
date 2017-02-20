import { default as React, PropTypes } from 'react'
import { default as compose } from 'recompose/compose'
import { default as withContext } from 'recompose/withContext'
import { default as withState } from 'recompose/withState'
import { default as withProps } from 'recompose/withProps'
import { default as withHandlers } from 'recompose/withHandlers'
import { default as branch } from 'recompose/branch'
import { default as renderComponent } from 'recompose/renderComponent'
import { omit } from 'lodash/fp'
import { default as Map } from './Map'
import { default as GoogleScriptLoader } from './GoogleScriptLoader'
export { default as Marker } from './Marker'

const enhance = compose(
  withProps(
    props => omit(props, ['googleMapURL', 'options'])
  ),
  withState('google', 'updateGoogleObject', null),
  withState('map', 'updateMapObject', null),
  withHandlers({
    scriptLoaded: props => () => props.updateGoogleObject(g => window.google ? window.google : null),
    mapDomReady: props => map => props.updateMapObject(map)
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
)(({ children, google }) => (<div>{children}</div>))

export default enhance(({ google, map, options, mapDomReady, children }) => {
  const renderChildren = google && map ? children : null

  return (
    <HOC google={google} map={map}>
      <Map google={google} options={options} mapDomReady={mapDomReady} />
      {renderChildren}
    </HOC>
  )
})
