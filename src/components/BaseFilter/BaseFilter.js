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
import { classNames } from 'helpers'
import s from './BaseFilter.sass'

import arrowIcon from 'icons/ui/arrow-big.svg'
import refreshIcon from 'icons/ui/refresh.svg'

export default class BaseFilter extends Component {
  render() {
    const { onSearchClick, className, onMoreButtonClick, isFull, noButtons, refresh } = this.props;

    return (
      <div className={s.container}>
        <FlexGrid justify="space-between" wrap="true"
                  className={classNames(s.wrapper, className)}>
          <BaseFilterRoomsContainer />
          <BaseFilterSubwayContainer />
          <BaseFilterCategoryContainer />
          <BaseFilterPriceContainer />

          <BaseFilterItem className={s.icon__wrapper}
                          onClick={onSearchClick}
                          tag={Link} to="/y" render={(
            <Svg className={s.icon} src={refresh ? refreshIcon : arrowIcon}/>
          )} />
        </FlexGrid>
        {!noButtons && <Link onClick={onMoreButtonClick} className={s.more} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
        </Link>}
      </div>
    )
  }
}

