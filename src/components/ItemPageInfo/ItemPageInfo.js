import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePrice
} from 'components'
import {
  ItemNumbersDataContainer, ItemPageRatingContainer
} from 'containers'
import { classNames } from 'helpers'
import { statusTypes, GREEN_COLOR } from 'constants'
import s from './ItemPageInfo.sass'

const mapStateToProps = ({user}) => ({
  user
})

@inject(mapStateToProps) @observer
export default class ItemPageInfo extends Component {
  getStatus = id => {
    if (this.props.user.isAdmin || this.props.user.has(id)) {
      return this.props.data.statusName;
    }
    if (this.props.data.status === statusTypes.types[1].id) {
      return {
        name: 'Проверено',
        color: GREEN_COLOR
      }
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
        <Helmet title={title}>
          <meta name="description" content={description} />
        </Helmet>
        <ItemNumbersDataContainer data={this.props.data}/>
        <ItemPageTitle id={order} status={status}>{title}</ItemPageTitle>
        {user && <ItemPageUser
                      id={id}
                      email={user.email}
                      link={user.link || '/y'}
                      isVerified={user.verified}>
          {user.name}
        </ItemPageUser>}
        <ItemPageType name={type.name}/>
        <ItemPagePrice data={price} dewa={dewa}/>
        <ItemPageContent>{description}</ItemPageContent>
        <ItemPageRatingContainer data={category} value={rating} />
      </div>
    )
  }
}

