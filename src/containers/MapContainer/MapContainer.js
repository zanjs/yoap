import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Map } from 'components'

@observer
export default class MapContainer extends Component {
  render() {
    return (
      <Map {...this.props}/>
    )
  }
}

