import { default as React, PropTypes } from 'react'
import { default as compose } from 'recompose/compose'
import { default as withContext } from 'recompose/withContext'
import { default as getContext } from 'recompose/getContext'
import { default as withState } from 'recompose/withState'

import { default as MarkerClustererPlus } from 'marker-clusterer-plus'

const enhance = compose(
  getContext({
    map: PropTypes.object.isRequired,
  }),
  withState('markerClusterer', 'updateMarkerClusterer', ({ map }) => new MarkerClustererPlus(map, [])),
)

const HOC = compose(
  withContext(
    {
      markerClusterer: PropTypes.object,
    },
    (props) => ({ markerClusterer: props.markerClusterer, })
  ),
)(({ children }) => (<div>{children}</div>))

export default enhance(({ children, markerClusterer }) => {
  return (
    <HOC markerClusterer={markerClusterer}>
      {children}
    </HOC>
  )
})
