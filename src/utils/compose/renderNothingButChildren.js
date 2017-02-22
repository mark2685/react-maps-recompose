import { default as React, Component } from 'react'
import { default as createHelper } from 'recompose/createHelper'

class NothingButChildren extends Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

NothingButChildren.displayName = 'NothingButChildren'

const renderNothingButChildren = _ => NothingButChildren

export default createHelper(renderNothingButChildren, 'renderNothingButChildren', false, true)
