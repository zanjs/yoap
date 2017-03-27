import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { MapItems, Title, Content } from 'components'

@inject(({items: {data}, device: {height}}) => ({data, height}))
export default class MapItemsContainer extends Component {
  render() {
    return (
      <MapItems height={this.props.height}
                data={this.props.data}/>
    )
  }
}

