import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageInfoScroller,
  SliderImages,
  ItemPageInfo
} from 'components'
import s from './ItemPageInfoContainer.sass'

const mapStateToProps = ({items: {current}}) => ({
  data: current
})

@inject(mapStateToProps) @observer
export default class ItemPageInfoContainer extends Component {
  render() {
    const { shouldUpdate, data } = this.props;

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <SliderImages data={data.images && data.images.gallery}/>
      )}>
        <ItemPageInfo data={data} className={s.info} />
      </ItemPageInfoScroller>
    )
  }
}

