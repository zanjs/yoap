import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Content, Image, Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './ItemTile.sass'

import subwayIcon from 'icons/ui/subway.svg'
import arrowIcon from 'icons/ui/arrow-right.svg'
import favoriteIcon from 'icons/ui/favorite.svg'

const ItemTile = ({className, data}) => {
  if (!data) return null;

  const {
    title, location, price, term,
    isFavorited, images
  } = data;

  const subway = location.subway && location.subway[0]

  return (
    <RouterLink to="/y/object" className={classNames(s.wrapper, className)}>
      {/* Image */}
      <div className={s.image}>
        {images.thumbnail &&
          <Image className={s.img}
                 preview={images.thumbnail.preview} src={images.thumbnail.full}/>
        }
        <Svg src={favoriteIcon} className={s.favorite} />
      </div>
      {/* Content */}
      <div className={s.content}>
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
          </FlexGrid>
        }

        {/* Title */}
        <div className={s.title}>
          <div className={s.title__wrapper}>
            <Content className={s.title__content}
                     size="5" regular>
              {title}
            </Content>
            {/* Price */}
            <Content size="5" gray regular className={s.price}>
              {`₽${price.amount || price}/${'месяц' || term}`}
            </Content>
          </div>

          <Svg src={arrowIcon} className={s.title__arrow} />
        </div>
      </div>
    </RouterLink>
  )
};

export default ItemTile;

