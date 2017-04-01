import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ProFilter } from 'components'


const mapStateToProps = ({
  filter: { data, size, floor, sizeChange, squaresChange, floorChange }
}) => ({
  derived: {data, size, floor}, sizeChange, squaresChange, floorChange
});
@inject(mapStateToProps) @observer
export default class ProFilterContainer extends Component {
  changeHandler = props => {
    if (this.props.onSizeChange) {
      this.props.onSizeChange(props);
    }
  };
  onBedRoomsChange = value => {
    if (this.props.edit) {
      return this.changeHandler({
        bedrooms: parseInt(value, 10)
      })
    }

    this.props.sizeChange(
      'bedrooms', value
    );
  };
  onBedsChange = value => {
    if (this.props.edit) {
      return this.changeHandler({
        beds: parseInt(value, 10)
      })
    }

    this.props.sizeChange(
      'beds', value
    );
  };
  onBathRoomsChange = value => {
    if (this.props.edit) {
      return this.changeHandler({
        bathrooms: parseInt(value, 10)
      })
    }

    this.props.sizeChange(
      'bathrooms', value
    )
  };
  onFloorChange = value => {
    if (this.props.edit) {
      return this.changeHandler({
        floors: value
      })
    }

    this.props.floorChange(
      value
    );
  };
  onSquaresChange = value => {
    if (this.props.edit) {
      return this.changeHandler({
        squares: parseInt(value, 10)
      })
    }

    this.props.squaresChange(
      value
    )
  };
  onRoomsChange = value => {
    return this.changeHandler({
      rooms: parseInt(value, 10)
    })
  };

  render() {
    const { edit, onChange } = this.props;

    const { data, size, floor } = edit
      ? this.props
      : this.props.derived;

    const _size = {
      ...size,

      floor,
      squares: size.squares.total ? size.squares.total : size.squares,

      onBedRoomsChange: this.onBedRoomsChange,
      onBedsChange: this.onBedsChange,
      onBathRoomsChange: this.onBathRoomsChange,
      onFloorChange: this.onFloorChange,
      onSquaresChange: this.onSquaresChange,
      onRoomsChange: this.onRoomsChange
    };


    return (
      <div>
        <ProFilter onChange={onChange} edit={edit}
                   readOnly={false} data={data} size={_size}/>
      </div>
    )
  }
}

