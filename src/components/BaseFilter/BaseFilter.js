import React, { Component } from 'react'
import {
  FlexGrid, Link, BaseFilterItem, Svg
} from 'components'
import {
  BaseFilterCategoryContainer,
  BaseFilterRoomsContainer,
  BaseFilterPriceContainer,
  BaseFilterSubwayContainer
} from 'containers'
import s from './BaseFilter.sass'

import arrowIcon from 'icons/ui/arrow-big.svg'

export default class BaseFilter extends Component {
  render() {
    const { children, onMoreButtonClick, isFull } = this.props;
    return (
      <div className={s.container}>
        <FlexGrid justify="space-between" wrap="true" className={s.wrapper}>
          <BaseFilterRoomsContainer />
          <BaseFilterSubwayContainer />
          <BaseFilterCategoryContainer />
          <BaseFilterPriceContainer />

          <BaseFilterItem tag={Link} to="/y"
                          className={s.icon__wrapper} render={(
            <Svg className={s.icon} src={arrowIcon}/>
          )} />
        </FlexGrid>
        <Link onClick={onMoreButtonClick} className={s.more} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
        </Link>
      </div>
    )
  }
}

