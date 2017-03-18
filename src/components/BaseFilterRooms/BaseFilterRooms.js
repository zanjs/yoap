import React, { Component } from 'react'
import { BaseFilterItem, BaseFilterSlider } from 'components'
import { classNames } from 'helpers'
import s from './BaseFilterRooms.sass'
import roomsIcon from 'icons/ui/rooms-amount.svg'

const Item = ({getRef, activeIndex, onClick, keyIndex, children}) => {
  const isActive = keyIndex === activeIndex;

  return (
    <span className={classNames(s.item, isActive && s.item_active)}
          onClick={() => onClick(keyIndex)}
          ref={b => getRef(b, keyIndex)}>
      {children}
    </span>
  )
}

export default class BaseFilterRooms extends Component {
  state = {activeIndex: false};

  rooms = [1,2,3,4,5,6,7,8,9,'10>'];
  blocks = [];

  getItemRef = (b, index) =>
    this.blocks[index] = b;

  clickHandler = activeIndex => this.setState({
    activeIndex
  })

  render() {
    const { rooms, getItemRef, clickHandler, state: {activeIndex} } = this;
    const hasActiveElement = activeIndex !== false;
    const _wrapperClassName = classNames(s.wrapper, hasActiveElement && s.wrapper_active);

    return (
      <BaseFilterItem title="Количество комнат" icon={roomsIcon}>
        <BaseFilterSlider className={_wrapperClassName}>
          {rooms.map((item, key) => (
            <Item activeIndex={activeIndex} keyIndex={key}
                  onClick={clickHandler} getRef={getItemRef} key={key}>
              {item}
            </Item>
          ))}
        </BaseFilterSlider>
      </BaseFilterItem>
    )
  }
}

