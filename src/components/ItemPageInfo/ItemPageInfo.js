import React, { Component } from 'react'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePrice, ItemPageRating
} from 'components'
import { classNames } from 'helpers'
import s from './ItemPageInfo.sass'

import userImage from 'images/user.jpg'

export default class ItemPageInfo extends Component {
  render() {
    return (
      <div className={classNames(s.wrapper, this.props.className)}>
        <ItemPageTitle id="021" status="Модерация">
          Светлая квартира в нордическом стиле
        </ItemPageTitle>
        <ItemPageContent>
          Все это выглядело бы чистым абсурдом, если бы не те ранние утра, когда, запив
          свой завтрак жидким чаем, я догонял трамвай, чтобы добавить еще одну вишенку к
          темной людской грозди, свисавшей с подножки, и плыл сквозь акварельный
          розово-голубой город к конуре-проходной. Там два вахтера
          проверяли наши пропуска, а фасад был украшен классическими фанерными пилястрами.
        </ItemPageContent>
        <ItemPageUser phone="+7 (911) 140–30–30"
                      email="irinaivanova@gmail.com"
                      link="/y" image={userImage}
                      isVerified>
          Ирина Иванова
        </ItemPageUser>
        <ItemPageType name="Квартира"/>
        <ItemPagePrice />
        <ItemPageRating />
      </div>
    )
  }
}

