import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { StarsRating } from 'components'

const mapStateToProps = ({manage: {data, changeData}, items: {updateItem}}) => ({
  value: data.value || 0,
  id: data.id,
  updateItem,
  changeData
})

@inject(mapStateToProps) @observer
export default class StarsRatingContainer extends Component {
  state = { value: this.props.value };
  onChange = __value => {
    const value = parseInt(__value, 10);
    console.log(value);
    if (this.props.id) {
      this.props.updateItem(this.props.id, {
        rating: value
      })
    };
    this.setState({value});
    this.props.changeData({
      rating: value
    })
  }
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

