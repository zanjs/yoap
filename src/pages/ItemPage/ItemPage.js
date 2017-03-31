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
import { randomNumber, normalizeScroll, isEmpty } from 'helpers'
import s from './ItemPage.sass'

@inject(({items: {data}}) => ({data}))
export default class ItemPage extends Component {
  state = {
    shouldUpdate: 0,
    data: {}
  };

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  componentWillReceiveProps(nextProps) {
    const {match: {params}, data} = nextProps;
    const { props } = this;
    if (props.match.params.link !== params.link || data !== props.data) {
      this.setData(nextProps);
    }
  }

  setData = (props = this.props) => {
    const { data, match: {params} } = props;
    if (isEmpty(data))
      return;

    this.setState({
      data: data.find(
        item => item._link === params.link
      )
    });
  };

  componentWillMount() {
    normalizeScroll(true);
    this.setData();
  }
  componentWillUnmount() {
    normalizeScroll(false);
  }

  render() {
    const {
      state: {shouldUpdate, data},
      onChange
    } = this;

    if (isEmpty(data))
      return null;

    const { types, size, floors } = data;
    window.data = data;

    const _size = {
      ...size,
      floors
    };

    return (
      <div>
        {/* Object title, des, images, price, rating, etc. */}
        <ItemPageInfoContainer data={data} shouldUpdate={shouldUpdate}/>
        {/* Object location */}
        <ItemPageLocationContainer onChange={onChange} data={data} shouldUpdate={shouldUpdate}/>
        {/* Object params */}
        <ItemPageParametersContainer onChange={onChange} data={types} size={_size} />
      </div>
    )
  }
}

