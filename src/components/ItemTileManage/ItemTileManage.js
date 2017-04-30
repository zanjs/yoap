import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Content, Image, Svg, Select,
  FlexGrid, ItemPageUser, StarsRating
} from 'components'
import { classNames } from 'helpers'
import { objectTypes, termTypes, subwaySpb, statusTypes } from 'constants'
import s from './ItemTileManage.sass'

import subwayIcon from 'icons/ui/subway.svg'
import plusIcon from 'icons/ui/plus.svg'
import minusIcon from 'icons/ui/plus.svg'

const { types } = statusTypes;
const selectContent = statusTypes.types.map(item => item.name || item.content);

export default class ItemTileManage extends Component {
  types  = types;
  selectContent = selectContent;

  getPrice = () => {
    const { price } = this.props.data;

    if (price.length) {
      const monthlyId = termTypes.types[2].id;
      const monthly = price.find(item => item.id === monthlyId);

      if (monthly) {
        return {
          term: 'месяц',
          price: monthly.value
        }
      }

      const { id, value } = price[0];
      const { name } = termTypes.types.find(item => item.id === id);

      return {
        term: name.toLowerCase(),
        price: value
      }
    }

    return {price: price.amount || price, term: 'месяц'};
  };
  getSize = () => {
    let output = {};
    const { size, type } = this.props.data;

    output.squares = size.squares.total || size.squares;
    if (size.rooms && type.id !== objectTypes.types[2].id) {
      output.rooms = size.rooms;
    }

    output.type = type.name;

    return output;
  };
  getSubway = loc => {
    if (loc && loc.subway) {
      const [station] = loc.subway;
      return {
        ...station,
        color: subwaySpb.find(station.id).color
      }
    }

    return {};
  };

  clickHandler = e => {
    const tagName = e.target.tagName.toLowerCase();

    if (
      tagName === 'svg'
      || tagName === 'path'
      || tagName === 'g'
      || tagName === 'select'
      || tagName === 'option') {
      e.preventDefault();
      return false;
    }

  };
  selectHandler = e => {
    const { value } = e.target;

    if (value === this.props.data.status)
      return;

    if (this.props.onStatusChange) {
      const type = this.types.find(item => item.name === value);
      this.props.onStatusChange(this.props.data, type.id);
    }
  };

  getSelectRef = b => this.select = b;

  acceptHandler = () => {
    if (this.props.onAccept) {
      this.props.onAccept(this.props.data);
    }
  };
  declineHandler = () => {
    if (this.props.onDecline) {
      this.props.onDecline(this.props.data);
    }
  };

  updateSelect = () => {
    if (!this.select)
      return;

    const { data: {status} } = this.props;
    const type = this.types.find(item => item.id === status);
    if (type)
      this.select.value = type.name;
  };

  componentDidMount() {
    this.updateSelect();
  }
  componentDidUpdate() {
    this.updateSelect();
  }

  render() {
    const {
      className, contentClassName,
      imageClassName, data, getRef
    } = this.props;

    if (!data)
      return null;

    const {
      acceptHandler,
      declineHandler,
      selectContent,
      selectHandler,
      getSelectRef
    } = this;
    const {
      title, location, _link,
      category, images, rating,
    } = data;

    const { price, term } = this.getPrice();
    const subway = this.getSubway(location);
    const address = location.address;
    const { squares, rooms, type } = this.getSize();

    const user = data.user || data._creator || {};

    return (
      <RouterLink to={`/manage/${_link}`} ref={getRef}
                  onClick={this.clickHandler}
           className={classNames(s.wrapper, className)}>
        {/* Image */}
        <div className={classNames(s.image, imageClassName)}>
          {images.thumbnail &&
          <Image className={s.img}
                 preview={images.thumbnail.preview}
                 src={images.thumbnail.full}/> || <div className={s.noimage} />}
          <FlexGrid justify="center" direction="column"
                    align="center" className={s.image__hover}>
            <FlexGrid justify="center" align="center" className={s.action}>
              <Svg onClick={declineHandler}
                   className={s.action__minus}
                   src={minusIcon} />
              <Svg onClick={acceptHandler}
                   className={s.action__plus}
                   src={plusIcon} />
            </FlexGrid>
          </FlexGrid>
        </div>
        {/* Content */}
        <div className={classNames(s.content, contentClassName)}>
          {/* Title */}
          <div className={s.title}>

            <FlexGrid className={s.status} justify="space-between" align="center">
              <Content size="6" nooffsets regular gray>Объявление #023</Content>
              <Content size="6" nooffsets regular>
                <Select inherit getRef={getSelectRef}
                        onChange={selectHandler} data={selectContent} />
              </Content>
            </FlexGrid>

            {/* Name of the object */}
            <Content className={s.title__content}
                     size="4" regular>
              {title}
            </Content>

            {/* Short params */}
            <FlexGrid justify="start" align="center" wrap="true">
              <Content className={s.title__content}
                       size="5" gray regular>
                {`${rooms ? `${rooms}-к` : type} – ${squares}м2 – ${category.name}`}
              </Content>
              {/* Rating */}
              <Content className={s.title__content}
                       size="5" gray regular>
                <StarsRating itemClassName={s.star}
                             activeColor="#9b9b9b"
                             inactiveColor="#e0e0e0"
                             tag="span" value={rating || 0}/>
              </Content>
            </FlexGrid>
          </div>
          {/* Subway */}
          {subway &&
          <FlexGrid align="center" justify="start"
                    className={s.subway}>
            <Svg className={s.subway__icon}
                 src={subwayIcon} style={{fill: subway.color}}/>
            <Content className={s.nooffsets}
                     size="5" regular gray>
              {subway.name || subway.content}
            </Content>
          </FlexGrid>}

          <Content size="4" lightColor regular>{address}</Content>

          {/* Price */}
          <Content size="4" regular gray className={s.price}>
            {`₽${price}/${term}`}
          </Content>

          {/* User */}
          <ItemPageUser className={s.user} titleClassName={s.user__title}
                        tag="div"
                        linkClassName={s.user__link} imageClassName={s.user__image}
                        linksClassName={s.user__links}
                        phone={user.phone} email={user.email}
                        link={user.link || '/y'} notitle
                        isVerified={user.verified}>
            {user.name}
          </ItemPageUser>
        </div>
      </RouterLink>
    )
  }
}

