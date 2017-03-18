import React, { Component } from 'react'
import { BaseFilterItem, BaseFilterSlider } from 'components'
import { classNames } from 'helpers'
import s from './BaseFilterRooms.sass'
import roomsIcon from 'icons/ui/rooms-amount.svg'

const Item = ({onClick, isActive, children}) => {
  return (
    <span className={classNames(s.item, isActive && s.item_active)}
          onClick={() => onClick(children)}>
      {children}
    </span>
  )
}

export default class BaseFilterRooms extends Component {
  clickHandler = room => {
    if (!this.props.toggleRooms) return;

    this.props.toggleRooms(room);

    return this.forceUpdate();
  };

  render() {
    const {
      clickHandler,
      props: { rooms, activeRooms }
    } = this;
    const hasActiveElement = activeRooms && !!activeRooms.length;
    const _wrapperClassName = classNames(s.wrapper, hasActiveElement && s.wrapper_active);

    return (
      <BaseFilterItem title="Количество комнат" icon={roomsIcon}>
        <BaseFilterSlider className={_wrapperClassName}>
          {rooms && rooms.map((item, key) => {
            const room = hasActiveElement && activeRooms.find(room => room === item)
            const isActive = typeof room === 'number';

            return (
              <Item isActive={isActive} key={key}
                    onClick={clickHandler}>
                {item}
              </Item>
            )
          }) || 'Произошла ошибка!'}
        </BaseFilterSlider>
      </BaseFilterItem>
    )
  }
}

