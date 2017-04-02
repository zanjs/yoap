import React, { Component, PropTypes } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Content, Image, Svg,
  FlexGrid, Container, StarsRating
} from 'components'
import { classNames } from 'helpers'
import { objectTypes, termTypes, subwaySpb } from 'constants'
import s from './ItemTile.sass'

import subwayIcon from 'icons/ui/subway.svg'
import arrowIcon from 'icons/ui/arrow-right.svg'
import favoriteIcon from 'icons/ui/favorite.svg'
import editIcon from 'icons/ui/edit.svg'

export default class ItemTile extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

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

  clickHandler = (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName === 'path' || tagName === 'svg') {
      e.preventDefault();
      return false;
    }
  };

  editClickHandler = () => {
    this.context.router.history.push(
      `/manage/${this.props.data._link}`
    )
  };

  render() {
    const {
      props: {
        className, link, contentClassName,
        imageClassName, data, getRef, edit
      },
      clickHandler,
      editClickHandler,
      favoriteClickHandler
    } = this;

    if (!data)
      return null;

    const {
      title, location,
      category, isFavorited,
      images, rating
    } = data;

    const { price, term } = this.getPrice();
    const subway = this.getSubway(location);
    const { squares, rooms, type } = this.getSize();

    return (
      <RouterLink ref={getRef} to={data.link} onClick={clickHandler}
                  className={classNames(s.wrapper, className)}>
        {/* Image */}
        <div className={classNames(s.image, imageClassName)}>
          {images && images.thumbnail &&
            <Image className={s.img}
                   preview={images.thumbnail.preview}
                   src={images.thumbnail.full}/> || <div className={s.image__noop}/>}
          {/* Price */}
          <Container type="container" className={s.price__wrapper}>
            <Content size="4" white regular className={s.price}>
              {`₽${price}/${term}`}
            </Content>
          </Container>
          <Svg src={edit ? editIcon : favoriteIcon}
               onClick={edit ? editClickHandler : favoriteClickHandler}
               className={s.favorite} />
        </div>
        {/* Content */}
        <div className={classNames(s.content, contentClassName)}>
          {/* Subway */}
          {subway &&
            <FlexGrid align="center" justify="start"
                      className={s.subway}>
              <Svg className={s.subway__icon}
                   src={subwayIcon} style={{fill: subway.color}}/>
              <Content className={s.nooffsets}
                       size="6" regular gray>
                {subway.name || subway.content}
              </Content>
            </FlexGrid>}

          {/* Title */}
          <div className={s.title}>
            <div className={s.title__wrapper}>
              <Content className={s.title__content}
                       size="5" regular>
                {title}
              </Content>
              <FlexGrid justify="start" align="center" wrap="true">
                <Content className={s.title__content}
                         size="5" gray regular>
                  {`${rooms ? `${rooms}-к` : type} – ${squares}м2 – ${category.name}`}
                </Content>
                <Content className={s.title__content}
                         size="5" gray regular>
                  <StarsRating itemClassName={s.star}
                               tag="span" value={rating || 5}/>
                </Content>
              </FlexGrid>
            </div>

            <Svg src={arrowIcon} className={s.title__arrow} />
          </div>
        </div>
      </RouterLink>
    )
  }
}

