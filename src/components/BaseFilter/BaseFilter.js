import React, { Component } from 'react'
import {
  FlexGrid, Link, BaseFilterItem,
  BaseFilterRooms, BaseFilterCategory
} from 'components'
import { BaseFilterCategoryContainer } from 'containers'
import s from './BaseFilter.sass'

import subwayIcon from 'icons/ui/subway.svg'
import houseIcon from 'icons/ui/house.svg'


export default class BaseFilter extends Component {
  render() {
    const { children, onMoreButtonClick, isFull } = this.props;
    return (
      <div className={s.container}>
        <FlexGrid justify="space-between" className={s.wrapper}>
          <BaseFilterRooms />
          <BaseFilterItem title="Ближайшее метро" icon={subwayIcon}>
            Звенигородская
          </BaseFilterItem>
          <BaseFilterCategoryContainer />
          <BaseFilterItem title="Стоимость в месяц">
            <br/>
            от 45.000 <br />
            до 65.000
          </BaseFilterItem>
        </FlexGrid>
        <Link onClick={onMoreButtonClick} className={s.more} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
        </Link>
      </div>
    )
  }
}

