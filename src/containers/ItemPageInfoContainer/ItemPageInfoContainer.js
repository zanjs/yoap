import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  SliderImages,
  ItemPageInfo
} from 'components'
import s from './ItemPageInfoContainer.sass'


export default class ItemPageInfoContainer extends Component {
  render() {
    const { shouldUpdate, data } = this.props;

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <SliderImages data={data.images.gallery}/>
      )}>
        <ItemPageInfo data={data} className={s.info} />
      </ItemPageInfoScroller>
    )
  }
}

