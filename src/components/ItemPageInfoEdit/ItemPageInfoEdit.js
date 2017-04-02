import React, { Component } from 'react'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePriceEdit, ItemPageRating
} from 'components'
import { classNames, normalizeScroll } from 'helpers'
import s from './ItemPageInfoEdit.sass'

import userImage from 'images/user.jpg'

export default class ItemPageInfoEdit extends Component {
  state = {
    title: '',
    description: '',
    type: {},
    price: []
  };

  componentWillMount() {
    normalizeScroll(true);
  }
  componentWillUnmount() {
    normalizeScroll(false);
  }


  onChangeTitle = ({target: {value}}) =>
    this.onChange({title: value});
  onChangeContent = ({target: {value}}) =>
    this.onChange({description: value});
  onTypeChange = type =>
    this.onChange({type});
  onPriceChange = props => {
    this.onChange(props);
  };

  onChange = props => {
    if (this.props.onChange) {
      this.props.onChange(props)
    }
  };

  render() {
    const { title, content, description, type, price, dewa } = this.props.data;
    const { className, user } = this.props;
    return (
      <div className={classNames(s.wrapper, className)}>
        <ItemPageTitle edit id="021" status="Модерация"
                       onChange={this.onChangeTitle}>
          {title}
        </ItemPageTitle>
        <ItemPageContent edit onChange={this.onChangeContent}>
          {content || description}
        </ItemPageContent>
        <ItemPageUser phone={user.phone}
                      email={user.email}
                      link="/y" image={user.image}
                      isVerified={user.verified}>
          {user.name}
        </ItemPageUser>
        <ItemPageType id={type && type.id || type || ''} edit onChange={this.onTypeChange}/>
        <ItemPagePriceEdit data={price} dewa={dewa} onChange={this.onPriceChange} />
        <ItemPageRating data={{name: 'Комфорт', value: 5}}/>
      </div>
    )
  }
}

