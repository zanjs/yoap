import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemTilesGrid } from 'components'

const mapStateToProps = ({items: {data}}) => ({
  data
})

@inject(mapStateToProps) @observer
export default class ItemTilesGridContainer extends Component {
  render() {
    return (
      <ItemTilesGrid {...this.props}/>
    )
  }
}

