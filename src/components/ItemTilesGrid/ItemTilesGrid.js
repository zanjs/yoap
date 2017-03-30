import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FlexGrid, ItemTile, Title } from 'components'
import { classNames } from 'helpers'
import s from './ItemTilesGrid.sass'

@inject('items') @observer
export default class ItemTilesGrid extends Component {
  render() {
    const {
      items: { data },
      getRef, limit = false,
      className, itemClassName
    } = this.props;
    const dataIsEmpty = !data || !data.length;

    return (
      <FlexGrid wrap="true" justify="start"
                align="start" getRef={getRef}
                className={classNames(s.wrapper, className)}>
        {!dataIsEmpty && data.map((item, key) => {
          if (limit && key > limit)
            return null;

          return (
            <ItemTile data={item} className={classNames(s.item, itemClassName)}
                      key={item.id || key} />
          )
        })}
        {dataIsEmpty && <Title gray light>Объекты либо не найдены, либо загружаются :)</Title>}
      </FlexGrid>
    )
  }
}

