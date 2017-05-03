import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Helmet from 'react-helmet'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePrice, Svg
} from 'components'
import {
  ItemNumbersDataContainer, ItemPageRatingContainer
} from 'containers'
import { classNames } from 'helpers'
import { statusTypes, GREEN_COLOR } from 'constants'
import s from './ItemPageInfo.sass'
import editIcon from 'icons/ui/edit.svg'

const mapStateToProps = ({user, items: {current}}) => ({
  user, data: current
})

@inject(mapStateToProps) @observer
export default class ItemPageInfo extends Component {
  getStatus = id => {
    if (this.props.user.isAdmin || this.props.user.has(id)) {
      return this.props.data.statusName;
    }

    const status = this.props.data.status.id || this.props.data.status;
    if (status === statusTypes.types[1].id) {
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
      id, _id, order,
      _link
    } = this.props.data;

    const objectId = _id || id;
    const user = this.props.data.user || this.props.data._creator;
    const isAdmin = this.props.user.isAdmin;
    const status = this.getStatus(objectId);
    console.log({isAdmin})

    return (
      <div className={classNames(s.wrapper, this.props.className)}>
        <Helmet title={title}>
          <meta name="description" content={description} />
        </Helmet>
        <ItemNumbersDataContainer data={this.props.data}>
          {isAdmin && <RouterLink to={`/manage/${_link}`}>
            <Svg src={editIcon} className={s.edit}/>
          </RouterLink>}
        </ItemNumbersDataContainer>
        <ItemPageTitle id={order} status={status}>{title}</ItemPageTitle>
        {user && <ItemPageUser
                      id={objectId}
                      email={user.email}
                      image={user.image}
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

