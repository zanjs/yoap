import React, { Component } from 'react'
import {
  ItemPageInfo, ItemPageInfoEdit,
  Container, ItemPageInfoScroller
} from 'components'
//import s from './ItemPage.sass'


export default class ItemPage extends Component {
  render() {
    return (
      <ItemPageInfoScroller style={{padding: '200px 0'}}>
        <ItemPageInfoEdit />
        {/*<ItemPageInfo />*/}
      </ItemPageInfoScroller>
    )
  }
}

