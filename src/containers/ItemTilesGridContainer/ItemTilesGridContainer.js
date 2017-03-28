import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemTilesGrid } from 'components'


@inject('items') @observer
export default class ItemTilesGridContainer extends Component {
  componentWillReact() {
    console.log('reaction!!!!');
  }
  render() {
    const { data } = this.props.items;
    return (
      <ItemTilesGrid data={data}/>
    )
  }
}

