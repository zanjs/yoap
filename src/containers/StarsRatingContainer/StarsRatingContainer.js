import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { StarsRating } from 'components'

const mapStateToProps = ({manage: {data, changeData}, user: {isAdmin}, items: {updateItem, current}}) => ({
  value: current.rating || data.rating || 0,
  id: data.id || data._id || current.id || current._id,
  updateItem,
  changeData,
  isAdmin
})

@inject(mapStateToProps) @observer
export default class StarsRatingContainer extends Component {
  state = { value: this.props.value };
  onChange = __value => {
    if (!this.props.isAdmin) {
      return
    }

    const value = parseInt(__value, 10);

    if (this.props.id) {
      this.props.updateItem(this.props.id, {
        rating: value
      })
    };

    this.setState({value});
    if (this.props.changeData) {
      this.props.changeData({
        rating: value
      })
    }
  };
  render() {
    const {
      props: {className},
      state: {value},
      onChange
    } = this;

    return <StarsRating onChange={onChange}
                        value={value} edit
                        className={className}/>
  }
}

