import React, { Component } from 'react'
import { FlexGrid, ItemTile, Title } from 'components'
import { classNames, isEmpty } from 'helpers'
import s from './ItemTilesGrid.sass'


export default class ItemTilesGrid extends Component {
  componentWillReceiveProps() {
    console.log('itemtiles grid received new props!');
  }
  render() {
    const {
      data, getRef, limit = false,
      className, itemClassName
    } = this.props;
    const dataIsEmpty = !data || !data.length;

    console.log('ItemTilesGrid', dataIsEmpty, [...data]);

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
        {dataIsEmpty && <Title>Объекты либо не найдены, либо загружаются :)</Title>}
      </FlexGrid>
    )
  }
}

