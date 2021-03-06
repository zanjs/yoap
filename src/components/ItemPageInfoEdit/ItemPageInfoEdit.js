import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageTitle, ItemPageContent,
  ItemPageUser, ItemPageType,
  ItemPagePriceEdit
} from 'components'
import {
  StatusChangeContainer,
  ItemPageRatingContainer
} from 'containers'
import { editPageConfig as config } from 'config'
import { classNames, normalizeScroll } from 'helpers'
import s from './ItemPageInfoEdit.sass'

const mapStateToProps = ({manage: {data, category, changeData}}) => ({
  data, changeData,
  category
});

@inject(mapStateToProps) @observer
export default class ItemPageInfoEdit extends Component {
  componentWillMount() {
    normalizeScroll(true);
  }
  componentWillUnmount() {
    normalizeScroll(false);
  }

  onChangeTitle = ({target: {value}}) => {
    if (value.length >= config.maxTitleLength)
      return false;

    this.onChange({title: value});
  }
  onChangeContent = ({target: {value}}) => {
    if (value.length >= config.maxContentLength)
      return false;

    this.onChange({description: value});
  };
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
      type, price, dewa, order
    } = this.props.data;
    const { className, category } = this.props;
    const user = this.props.data.user || this.props.user;

    return (
      <div className={classNames(s.wrapper, className)}>
        <ItemPageTitle edit id={order}
                       statusContent={<StatusChangeContainer/>}
                       onChange={this.onChangeTitle}>
          {title}
        </ItemPageTitle>
        <ItemPageContent edit onChange={this.onChangeContent}>
          {content || description}
        </ItemPageContent>
        <ItemPageUser phone={user.phone}
                      id={this.props.data._id || this.props.data.id}
                      email={user.email} link="/you"
                      image={user.image}
                      isVerified={user.verified}>
          {user.name}
        </ItemPageUser>
        <ItemPageType id={type && type.id || type || ''} edit onChange={this.onTypeChange}/>
        <ItemPagePriceEdit data={price} dewa={dewa} onChange={this.onPriceChange} />
        <ItemPageRatingContainer data={category}/>
      </div>
    )
  }
}

