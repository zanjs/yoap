import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { MapItems } from 'components'

const mapStateToProps = ({items, device: {height}}) => ({
  height, items, data: items.data
});

@inject(mapStateToProps) @observer
export default class MapItemsContainer extends Component {
  render() {
    console.log('mapitemsrender');
    return (
      <MapItems height={this.props.height}
                data={this.props.items.data}/>
    )
  }
}

