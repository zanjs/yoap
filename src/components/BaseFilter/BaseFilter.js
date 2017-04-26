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
import refreshIcon from 'icons/ui/refresh.svg'

export default class BaseFilter extends Component {
  render() {
    const { children, onMoreButtonClick, isFull, refresh } = this.props;
    return (
      <div className={s.container}>
        <FlexGrid justify="space-between" wrap="true" className={s.wrapper}>
          <BaseFilterRoomsContainer />
          <BaseFilterSubwayContainer />
          <BaseFilterCategoryContainer />
          <BaseFilterPriceContainer />

          <BaseFilterItem className={s.icon__wrapper}
                          tag={Link} to="/y" render={(
            <Svg className={s.icon} src={refresh ? refreshIcon : arrowIcon}/>
          )} />
        </FlexGrid>
        <Link onClick={onMoreButtonClick} className={s.more} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
        </Link>
      </div>
    )
  }
}

