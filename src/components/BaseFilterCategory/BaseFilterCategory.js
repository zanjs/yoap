import React, { Component } from 'react'
import { BaseFilterItem, BaseFilterSlider } from 'components'
import { classNames, isEmpty } from 'helpers'
import s from './BaseFilterCategory.sass'

import houseIcon from 'icons/ui/house.svg'

const Item = ({children, className, onClick, getRef, index, isActive}) => (
  <span onClick={() => onClick(index)} ref={getRef}
        className={classNames(s.item, className, isActive && s.item_active)}>
    {children}
  </span>
);

export default class BaseFilterCategory extends Component {
  clickHandler = index => {
    if (!this.props.setCategory) return;

    this.props.setCategory(
      this.props.data[index]
    );
  };

  getDefaultSnapElement = () => {
    return document.querySelector(`.${s.item_active}`);
  };

  render() {
    const { props: { data, category }, block, getDefaultSnapElement } = this;

    if (!data) return null;

    const hasActive = !isEmpty(category);
    const wrapperClassName = classNames(s.wrapper, hasActive && s.wrapper_active);

    return (
      <BaseFilterItem className={s.container} title="Категория объекта" icon={houseIcon}>
        <BaseFilterSlider snap defaultSnapElement={getDefaultSnapElement} className={wrapperClassName}>
          {data.map((item, key) => {
            const className = !hasActive && key === 2 && s.item_active || null;
            return (
              <Item onClick={this.clickHandler} className={className}
                    isActive={hasActive && category.id === item.id}
                    key={key} index={key}>{item.name}</Item>
            )
          })}
        </BaseFilterSlider>
      </BaseFilterItem>
    )
  }
}

