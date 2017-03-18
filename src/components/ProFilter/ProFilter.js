import React, { Component } from 'react'
import { ItemParams, ItemParamsRowSize } from 'components'

export default class ProFilter extends Component {
  render() {
    const { data, size } = this.props
    return (
      <ItemParams data={data}>
        <ItemParamsRowSize title="Комнаты и кровати" {...size}/>
      </ItemParams>
    )
  }
}

