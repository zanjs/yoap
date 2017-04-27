import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePrice, ItemPageRating
} from 'components'
import { classNames } from 'helpers'
import s from './ItemPageInfo.sass'


@inject('user') @observer
export default class ItemPageInfo extends Component {
  getStatus = id => {
    if (this.props.user.isAdmin || this.props.user.has(id)) {
      return this.props.data.statusName;
    }

    return null;
  };

  render() {
    const {
      title, description,
      price, dewa, rating,
      category, type,
      id, order
    } = this.props.data;

    const user = this.props.data.user || this.props.data._creator;
    const status = this.getStatus(id);

    return (
      <div className={classNames(s.wrapper, this.props.className)}>
        <Helmet title={title}/>
        <ItemPageTitle id={order} status={status}>{title}</ItemPageTitle>
        {user && <ItemPageUser phone={user.phone}
                      email={user.email}
                      link={user.link || '/y'}
                      isVerified>
          {user.name}
        </ItemPageUser>}
        <ItemPageType name={type.name}/>
        <ItemPagePrice data={price} dewa={dewa}/>
        <ItemPageContent>{description}</ItemPageContent>
        <ItemPageRating data={category} value={rating} />
      </div>
    )
  }
}

