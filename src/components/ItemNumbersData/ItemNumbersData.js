import React  from 'react'
import { observer } from 'mobx-react'
import { FlexGrid, Svg, Content } from 'components'
import { classNames, getDateDifference } from 'helpers'
import s from './ItemNumbersData.sass'

import viewsIcon from 'icons/ui/views.svg'
import favoriteIcon from 'icons/ui/favlorite-bg.svg'

const getFeaturedClassName = isActive => {
  if (typeof isActive !== 'boolean')
    return s.item;

  return classNames(s.item, s.featured, isActive && s.featured_active)
}

const ItemNumbersData = ({date, views, children, featured, isFeaturedActive, onFeaturedClick}) => (
  <FlexGrid align="center" justify="start">
    <Content size="4" gray className={s.item}>
      {getDateDifference(date)}
    </Content>
    <FlexGrid className={s.item}>
      <Svg src={viewsIcon} className={s.icon}/>
      <Content size="4" gray nooffsets>{views + 1}</Content>
    </FlexGrid>
    <FlexGrid className={getFeaturedClassName(isFeaturedActive)}
              onClick={onFeaturedClick}>
      <Svg src={favoriteIcon} className={s.icon}/>
      <Content size="4" gray nooffsets>{featured}</Content>
    </FlexGrid>
    {children}
  </FlexGrid>
)

export default observer(ItemNumbersData);

