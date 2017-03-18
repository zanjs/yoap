import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BaseFilterRooms } from 'components'

const mapStateToProps = ({filter: { toggleRooms, rooms, size }}) => ({
  rooms, activeRooms: size.rooms, toggleRooms
});
@inject(mapStateToProps) @observer
export default class BaseFilterRoomsContainer extends Component {
  render() {
    return (
      <BaseFilterRooms {...this.props}/>
    )
  }
}

