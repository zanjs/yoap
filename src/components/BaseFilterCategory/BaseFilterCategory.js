import React, { Component } from 'react'
import { BaseFilterItem, BaseFilterSlider } from 'components'
import { classNames, isEmpty } from 'helpers'
import s from './BaseFilterCategory.sass'

import houseIcon from 'icons/ui/house.svg'

const Item = ({children, onClick, index, isActive}) => (
  <span onClick={() => onClick(index)}
        className={classNames(s.item, isActive && s.item_active)}>
    {children}
  </span>
)

export default class BaseFilterCategory extends Component {
  clickHandler = index => {
    if (!this.props.setCategory) return;

    this.props.setCategory(
      this.props.data[index]
    );
  }

  render() {
    const { props: { data, category } } = this;

    if (!data) return null;

    const hasActive = !isEmpty(category);
    const wrapperClassName = classNames(s.wrapper, hasActive && s.wrapper_active);

    return (
      <BaseFilterItem title="Категория объекта" icon={houseIcon}>
        <BaseFilterSlider className={wrapperClassName}>
          {data.map((item, key) => {
            return (
              <Item onClick={this.clickHandler}
                    isActive={hasActive && category.id === item.id}
                    key={key} index={key}>{item.name}</Item>
            )
          })}
        </BaseFilterSlider>
      </BaseFilterItem>
    )
  }
}

