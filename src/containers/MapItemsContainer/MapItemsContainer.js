import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { MapItems, Title, Content } from 'components'

@inject({items: {data}})
export default class MapItemsContainer extends Component {
  render() {
    return (
      <MapItems data={this.props.data}/>
    )
  }
}

