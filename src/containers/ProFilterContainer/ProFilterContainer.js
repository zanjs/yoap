import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ProFilter } from 'components'


const mapStateToProps = ({
  filter: { data, size, floor, sizeChange, squaresChange, floorChange }
}) => ({
  data, size, floor, sizeChange, squaresChange, floorChange
});
@inject(mapStateToProps) @observer
export default class ProFilterContainer extends Component {
  onBedRoomsChange = value => this.props.sizeChange(
    'bedrooms', value
  )
  onBedsChange = value => this.props.sizeChange(
    'beds', value
  )
  onBathRoomsChange = value => this.props.sizeChange(
    'bathrooms', value
  )
  onFloorChange = value => this.props.floorChange(
    value
  )
  onSquaresChange = value => {
    this.props.squaresChange(
      'total', value
    )
  }

  render() {
    const { data, size, floor } = this.props;

    const _size = {
      ...size,

      floor,
      squares: size.squares.total,

      onBedRoomsChange: this.onBedRoomsChange,
      onBedsChange: this.onBedsChange,
      onBathRoomsChange: this.onBathRoomsChange,
      onFloorChange: this.onFloorChange,
      onSquaresChange: this.onSquaresChange,
    };


    return (
      <ProFilter data={data} size={_size}/>
    )
  }
}

