import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ItemTilesBanner } from 'components'
import { devicesBreakpoints } from 'config'

const mapStateToProps = ({device: {width}, items: {data}}) => ({
  data, isMobile: width <= devicesBreakpoints.mobile
})

@inject(mapStateToProps) @observer
export default class ItemTilesBannerContainer extends Component {
  render() {
    return <ItemTilesBanner {...this.props}/>
  }
}

