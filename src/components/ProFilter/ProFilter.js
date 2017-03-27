import React, { Component } from 'react'
import { ItemParams, ItemParamsRowSize } from 'components'

export default class ProFilter extends Component {
  render() {
    const { data, size, readOnly, onChange } = this.props;
    return (
      <ItemParams onChange={onChange} readOnly data={data}>
        {size && <ItemParamsRowSize readOnly title="Комнаты и кровати" {...size}/>}
      </ItemParams>
    )
  }
}

