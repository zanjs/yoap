import React  from 'react'
import { FlexGrid, Svg, Content } from 'components'
import { isEmpty, classNames } from 'helpers'
import s from './ItemNumbersData.sass'

import viewsIcon from 'icons/ui/views.svg'
import favoriteIcon from 'icons/ui/favlorite-bg.svg'

const parseData = __data => {
  if (isEmpty(__data))
    return 'Свежее';

  const date = new Date(__data);
  let day = date.getDate().toString();
  let month = (date.getMonth()+1).toString();
  let year = date.getFullYear().toString();

  if (day.length < 2) {
    day = `0${day}`
  }
  if (month.length < 2) {
    month = `0${month}`
  }

  return `${day}.${month}.${year}`
}

const getFeaturedClassName = isActive => {
  if (typeof isActive !== 'boolean')
    return s.item;

  return classNames(s.item, s.featured, isActive && s.featured_active)
}

const ItemNumbersData = ({date, views, featured, isFeaturedActive, onFeaturedClick}) => (
  <FlexGrid align="center" justify="start">
    <Content size="4" gray className={s.item}>
      {parseData(date)}
    </Content>
    <FlexGrid className={s.item}>
      <Svg src={viewsIcon} className={s.icon}/>
      <Content size="4" gray nooffsets>{views}</Content>
    </FlexGrid>
    <FlexGrid className={getFeaturedClassName(isFeaturedActive)}>
      <Svg src={favoriteIcon} className={s.icon}/>
      <Content size="4" gray nooffsets>{featured}</Content>
    </FlexGrid>
  </FlexGrid>
)

export default ItemNumbersData;

