import React, { Component } from 'react'
import { inject } from 'mobx-react'
import {
  ItemPageInfo, ItemPageLocation,
  ItemPageInfoScroller,
  SliderImages, Image,
  Map
} from 'components'
import {
  ItemPageParametersContainer,
  ItemPageInfoContainer,
  ItemPageLocationContainer
} from 'containers'
import { randomNumber, normalizeScroll } from 'helpers'
import { ItemModel } from 'models'
import itemData from './item'
import s from './ItemPage.sass'


export default class ItemPage extends Component {
  static defaultProps = {
    data: ItemModel.fromJS(null, itemData)
  };

  state = {
    shouldUpdate: 0
  };

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  componentWillMount() {
    normalizeScroll(true);
  }
  componentWillUnmount() {
    normalizeScroll(false);
  }

  render() {
    const {
      props: {data},
      state: {shouldUpdate},
      onChange
    } = this;

    const { types } = data;

    console.log(window.data = data);

    return (
      <div>
        {/* Object title, des, images, price, rating, etc. */}
        <ItemPageInfoContainer data={data} shouldUpdate={shouldUpdate}/>
        {/* Object params */}
        <ItemPageParametersContainer onChange={onChange} data={types} />
        {/* Object location */}
        <ItemPageLocationContainer data={data} shouldUpdate={shouldUpdate}/>
      </div>
    )
  }
}

