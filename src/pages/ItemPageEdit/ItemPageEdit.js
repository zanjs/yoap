import React, { Component } from 'react'
import { inject } from 'mobx-react'
import {
  ItemPageInfo, ItemPageInfoEdit,
  Container, ItemPageInfoScroller,
  SliderImages
} from 'components'
import { ItemPageParametersContainer } from 'containers'
import { randomNumber } from 'helpers'
import s from './ItemPageEdit.sass'

@inject(({items: {data}}) => ({
  images: data ? data[0].images.gallery : null,
  item: data[0]
}))
export default class ItemPageEdit extends Component {
  state = {
    shouldUpdate: 0
  };

  onChange = () => {
    const shouldUpdate = randomNumber(1111,9999);

    this.setState({
      shouldUpdate
    })
  };

  render() {
    const {
      props: {images, item},
      state: {shouldUpdate},
      onChange
    } = this;
    return (
      <div>
        <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
          <SliderImages data={images}/>
        )}>
          {/*<ItemPageInfoEdit />*/}
          <ItemPageInfoEdit className={s.info} />
        </ItemPageInfoScroller>

        <ItemPageParametersContainer onChange={onChange}
                                     data={item.types} />
      </div>
    )
  }
}

