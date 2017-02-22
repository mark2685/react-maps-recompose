import { default as React } from 'react'
import { default as compose } from 'recompose/compose'
import { default as withProps } from 'recompose/withProps'
import { default as onlyUpdateForKeys } from 'recompose/onlyUpdateForKeys'
import { default as toClass } from 'recompose/toClass'
import { default as withHandlers } from 'recompose/withHandlers'
import { omit } from 'lodash/fp'

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
}

const enhance = compose(
  withProps(props => omit(props, ['google', 'mapOptions'])),
  withHandlers({
    domReady: ({ google, mapOptions, mapDomReady }) => node => {
      const map = new google.maps.Map(node, mapOptions)

      mapDomReady(map)
    }
  }),
  onlyUpdateForKeys(['google', 'mapOptions']),
  toClass // needed for `ref`
)

const Map = enhance(({ google, domReady, children }) => {
  return (
    <div style={styles.container}>
      <div  ref={(ref) => { return domReady(ref) }} style={styles.map}></div>
    </div>
  )
})

export default Map
