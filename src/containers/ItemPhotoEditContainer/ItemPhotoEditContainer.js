import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemPageEditPhoto } from 'components'

const mapStateToProps = ({manage: {data, changeData}}) => ({
  data: data.images,
  changeData
});

@inject(mapStateToProps) @observer
export default class ItemPhotoEditContainer extends Component {
  onChange = images => {
    this.props.changeData({images});
  };

  render() {
    return <ItemPageEditPhoto data={this.props.data}
                              onChange={this.onChange} />
  }
}

