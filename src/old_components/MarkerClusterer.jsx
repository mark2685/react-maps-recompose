import { default as React, Component } from 'react'
import { default as MarkerClustererPlus } from 'marker-clusterer-plus'

export default class MarkerClusterer extends Component {
  constructor(props) {
    super(props)

    const { map } = this.props

    const markerClusterer = new MarkerClustererPlus(map, [])

    this.state = { markerClusterer }
  }
  componentDidMount() {}

  componentDidUpdate(/*prevProps*/) {}

  componentWillUnmount() {}

  render() {
    const { markerClusterer } = this.state
    const { children, google, map } = this.props
    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { map, google, markerClusterer, })
    })
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}
