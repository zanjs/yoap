import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  SliderImages,
  ItemPageInfo
} from 'components'
import s from './ItemPageInfoContainer.sass'


export default class ItemPageInfoContainer extends Component {
  render() {
    const { shouldUpdate, data, user } = this.props;

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <SliderImages data={data.images && data.images.gallery}/>
      )}>
        <ItemPageInfo data={data} user={user} className={s.info} />
      </ItemPageInfoScroller>
    )
  }
}

