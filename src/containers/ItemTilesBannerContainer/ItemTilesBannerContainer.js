import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ItemTilesBanner } from 'components'

const mapStateToProps = ({items: {data}}) => ({
  data
})

@inject(mapStateToProps) @observer
export default class ItemTilesBannerContainer extends Component {
  render() {
    return <ItemTilesBanner {...this.props}/>
  }
}

