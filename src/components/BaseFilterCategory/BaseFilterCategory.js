import React, { Component } from 'react'
import { BaseFilterItem, BaseFilterSlider } from 'components'
import { categoryTypes } from 'constants'
import { classNames } from 'helpers'
import s from './BaseFilterCategory.sass'

import houseIcon from 'icons/ui/house.svg'

const Item = ({children, isActive}) => (
  <span className={classNames(s.item, isActive && s.item_active)}>
    {children}
  </span>
)

export default class BaseFilterCategory extends Component {
  static defaultProps = {data: categoryTypes};

  hasActive = data => data.find(item => !!item.isActive);

  clickHandler = index => {

  }

  render() {
    const { props: { data } } = this;
    const hasActive = this.hasActive(data);
    const wrapperClassName = classNames(s.wrapper, hasActive && s.wrapper_active);

    return (
      <BaseFilterItem title="Категория объекта" icon={houseIcon}>
        <BaseFilterSlider className={wrapperClassName}>
          {data.map((item, key) => (
            <Item onClick={this.clickHandler} isActive={item.isActive}
                  key={key}>{item.name}</Item>
          ))}
        </BaseFilterSlider>
      </BaseFilterItem>
    )
  }
}

