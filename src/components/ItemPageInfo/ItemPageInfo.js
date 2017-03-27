import React, { Component } from 'react'
import Helmet from 'react-helmet'
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
    const {
      title, description,
      status, user,
      price, rating,
      category, type
    } = this.props.data;

    return (
      <div className={classNames(s.wrapper, this.props.className)}>
        <Helmet title={title}/>
        <ItemPageTitle id="021" status={status}>{title}</ItemPageTitle>
        <ItemPageContent>{description}</ItemPageContent>
        <ItemPageUser phone={user.phone}
                      email={user.email}
                      link={user.link || '/y'}
                      isVerified>
          {user.name}
        </ItemPageUser>
        <ItemPageType name={type.name}/>
        <ItemPagePrice data={price} />
        <ItemPageRating data={category} value={rating} />
      </div>
    )
  }
}

