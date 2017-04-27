import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePriceEdit, ItemPageRating
} from 'components'
import { StatusChangeContainer } from 'containers'
import { classNames, normalizeScroll } from 'helpers'
import s from './ItemPageInfoEdit.sass'

const mapStateToProps = ({manage: {data, changeData}}) => ({
  data, changeData
});

@inject(mapStateToProps) @observer
export default class ItemPageInfoEdit extends Component {
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
    if (this.props.changeData) {
      this.props.changeData(props)
    }
    if (this.props.onUpdate) {
      this.props.onUpdate()
    }
  };

  render() {
    const {
      title, content, description,
      type, price, dewa
    } = this.props.data;
    const { className, user } = this.props;
    return (
      <div className={classNames(s.wrapper, className)}>
        <ItemPageTitle edit id="021"
                       statusContent={<StatusChangeContainer/>}
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

