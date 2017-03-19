import React, { Component } from 'react'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePrice, ItemPageRating
} from 'components'
import s from './ItemPageInfoEdit.sass'

import userImage from 'images/user.jpg'

export default class ItemPageInfoEdit extends Component {
  state = {
    title: '',
    content: '',
    type: {},
    price: []
  }

  onChangeTitle = ({target: {value}}) =>
    this.setState({title: value})
  onChangeContent = ({target: {value}}) =>
    this.setState({content: value})
  onTypeChange = type =>
    this.setState({type})
  onPriceChange = data => {
    if (data.delete) {
      return this.setState({
        price: this.state.price.filter(
          item => item.id !== data.id
        )
      })
    }

    return this.setState({
      price: [
        ...this.state.price,
        data
      ]
    })
  }

  render() {
    const { title, content, type, price } = this.state;
    return (
      <div className={s.wrapper}>
        <ItemPageTitle edit id="021" status="Модерация"
                       onChange={this.onChangeTitle}>
          {title}
        </ItemPageTitle>
        <ItemPageContent edit onChange={this.onChangeContent}>
          {content}
        </ItemPageContent>
        <ItemPageUser phone="+7 (911) 140–30–30"
                      email="irinaivanova@gmail.com"
                      link="/y" image={userImage}
                      isVerified>
          Ирина Иванова
        </ItemPageUser>
        <ItemPageType id={type.id} edit onChange={this.onTypeChange}/>
        <ItemPagePrice data={price} edit onChange={this.onPriceChange} />
        <ItemPageRating />
      </div>
    )
  }
}

