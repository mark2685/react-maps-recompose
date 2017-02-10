import { default as React, Component, PropTypes } from 'react' // eslint-disable-line no-unused-vars

const LOADING_STATE_NONE   = `LOADING_STATE_NONE`
const LOADING_STATE_BEGIN  = `LOADING_STATE_BEGIN`
const LOADING_STATE_LOADED = `LOADING_STATE_LOADED`

class GoogleMapAsyncLoader extends Component {
  static propTypes = {
    googleMapUrl: PropTypes.string.isRequired,
    loadingElement: PropTypes.element.isRequired,
    onReady: PropTypes.func
  }

  state = {
    loading: LOADING_STATE_NONE
  }

  handleLoaded() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      loading: LOADING_STATE_LOADED,
    })

    if (this.props.onReady) {
      this.props.onReady()
    }
  }

  componentDidMount() {
    const { loading } = this.state

    if (loading !== LOADING_STATE_NONE) {
      return
    }

    if (loading === LOADING_STATE_NONE) {
      this.setState({
        loading: LOADING_STATE_BEGIN
      })

      const { googleMapUrl: url } = this.props

      // Asyncronous JavaScript loader and dependency manager
      const scriptjs = require('scriptjs')

      scriptjs(url, this.handleLoaded.bind(this))
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const { loading } = this.state

    if (loading !== LOADING_STATE_LOADED) {
      return (this.props.loadingElement)
    } else {
      return false
    }
  }
}

export default GoogleMapAsyncLoader
