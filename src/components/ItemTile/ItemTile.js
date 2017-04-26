import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { Link as RouterLink } from 'react-router-dom'
import {
  Content, Image, Svg,
  FlexGrid, Container, StarsRating
} from 'components'
import { classNames } from 'helpers'
import s from './ItemTile.sass'

import subwayIcon from 'icons/ui/subway.svg'
import arrowIcon from 'icons/ui/arrow-right.svg'
import favoriteIcon from 'icons/ui/favorite.svg'
import editIcon from 'icons/ui/edit.svg'

export default class ItemTile extends Component {
  clickHandler = (e) => {
    if (!!e.target.closest(`.${s.favorite}`)) {
      e.preventDefault();
      return false;
    }

    if (this.props.onClick) {
      this.props.onClick(e)
    }
  };
  editClickHandler = (e) => {
    //e.stopPropagation();
    if (this.props.onEditClick) {
      this.props.onEditClick(e);
    }
  };
  favoriteClickHandler = (e) => {
    //e.stopPropagation();
    if (this.props.onFavoriteClick) {
      this.props.onFavoriteClick(e);
    }
  };

  render() {
    const {
      props: {
        className, link, contentClassName,
        imageClassName, price, getRef,
        term, subway, rating, images,
        title, location,
        category,
        edit, featured,
        squares, rooms, type
      },
      clickHandler,
      editClickHandler,
      favoriteClickHandler
    } = this;

    return (
      <a ref={getRef} href={link} onClick={clickHandler}
         className={classNames(s.wrapper, className)}>
        {/* Image */}
        <div className={classNames(s.image, imageClassName)}>
          {images && images.thumbnail &&
            <Image className={s.img}
                   preview={images.thumbnail.preview}
                   src={images.thumbnail.mobile || images.thumbnail.full}/> ||
          <div className={s.image__noop}/>}
          {/* Price */}
          <Container type="container" className={s.price__wrapper}>
            <Content size="4" white regular className={s.price}>
              {`₽${price}/${term}`}
            </Content>
          </Container>
          <Svg src={edit ? editIcon : favoriteIcon}
               onClick={edit ? editClickHandler : favoriteClickHandler}
               className={classNames(s.favorite, featured && s.favorite_active)} />
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
                {`${subway.name || subway.content}${subway.distance ? `, ${subway.distance}` : ''}`}
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
                               tag="span" value={rating || 0}/>
                </Content>
              </FlexGrid>
            </div>

            <Svg src={arrowIcon} className={s.title__arrow} />
          </div>
        </div>
      </a>
    )
  }
}

