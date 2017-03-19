import React, { Component } from 'react'
import { FlexGrid, ItemTile } from 'components'
import { classNames } from 'helpers'
import s from './ItemTilesGrid.sass'


const ItemTilesGrid = ({data, getRef, limit = false, className, itemClassName}) => {
  if (!data || !data.length) return null;

  return (
    <FlexGrid wrap="true" justify="start"
              align="start" getRef={getRef}
              className={classNames(s.wrapper, className)}>
      {data.map((item, key) => {
        if (limit && key > limit)
          return null;

        return (
          <ItemTile data={item} className={classNames(s.item, itemClassName)}
                    key={item.id || key} />
        )
      })}
    </FlexGrid>
  )
};

export default ItemTilesGrid;

