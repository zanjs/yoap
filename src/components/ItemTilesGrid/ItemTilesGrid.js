import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import LazyRender from 'react-lazy-render'
import { FlexGrid, Title } from 'components'
import { ItemTileContainer } from 'containers'
import { classNames } from 'helpers'
import s from './ItemTilesGrid.sass'

@inject('items') @observer
export default class ItemTilesGrid extends Component {
  componentWillReact() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }
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
        {!dataIsEmpty &&
          data.map((item, key) => {
            if (limit && key > limit)
              return null;

            return <ItemTileContainer key={key} data={item}
                                      className={classNames(s.item, itemClassName)} />
          })}
        {dataIsEmpty && <Title gray light>Объекты либо не найдены, либо загружаются :)</Title>}
      </FlexGrid>
    )
  }
}

