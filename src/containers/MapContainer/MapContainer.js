import React, { Component } from 'react'
import { Map } from 'components'


export default class MapContainer extends Component {
  render() {
    return (
      <Map {...this.props}/>
    )
  }
}

