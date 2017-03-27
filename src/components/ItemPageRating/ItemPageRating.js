import React, { Component } from 'react'
import {
  ItemPageInfoTitle, Content,
  StarsRating, FlexGrid
} from 'components'
import s from './ItemPageRating.sass'


const ItemPageRating = ({value, data}) => {
  return (
    <div className={s.wrapper}>
      <ItemPageInfoTitle title="Рейтинг объекта"/>
      <FlexGrid justify="start" align="center">
        <Content lightColor light size="2">
          {data.name}
        </Content>
        <StarsRating value={value} className={s.stars}/>
      </FlexGrid>
    </div>
  )
};

export default ItemPageRating;

