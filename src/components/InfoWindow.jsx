import { default as React, Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { default as ReactDOM, ReactDOMServer} from 'react-dom'

export default class InfoWindow extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    map: PropTypes.object,
    marker: PropTypes.object,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  static defaultProps = {
    visible: false
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen()
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker)
  }

  closeWindow() {
    this.infowindow.close()
  }

  updateContent() {
    const content = this.renderChildren()
    this.infowindow.setContent(content)
  }

  componentDidMount() {
    this.renderInfoWindow()
  }

  componentDidUpdate(prevProps) {
    const { google, map } = this.props

    if (!google || !map) {
      return
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow()
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent()
    }

    if ((this.props.visible !== prevProps.visible || this.props.marker !== prevProps.marker)) {
      this.props.visible ? this.openWindow() : this.closeWindow()
    }
  }

  renderChildren() {
    const { children } = this.props
    // TODO: Why are we using ReactDOMServer to render the children to string?
    return ReactDOMServer.renderToString(children)
  }

  renderInfoWindow() {
    const { map, google, mapCenter } = this.props

    if (!google || !google.maps) {
      return
    }

    const iw = this.infowindow = new google.maps.InfoWindow({
      content: ''
    })

    google.maps.event.addListener(iw, 'closeclick', this.onClose.bind(this))
    google.maps.event.addListener(iw, 'domready', this.onOpen.bind(this))
  }

  render() {
    console.log('InfoWindow.render')
    return null
  }
}
