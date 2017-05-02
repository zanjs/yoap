import React, { Component } from 'react'
import {
  Title, Content, Svg,
  FlexGrid, InputClean,
  AddressInput, Map
} from 'components'
import { classNames } from 'helpers'
import s from './UserCustomAddressItem.sass'

import closeIcon from 'icons/ui/close.svg'
import pinIcon from 'icons/ui/location.svg'


const mapSettings = {
  disableDefaultUI: true,
  fullscreenControl: false,
  scaleControl: false,
  scrollwheel: false,
  streetViewControl: false,
  zoomControl: true
};

const UserCustomAddressItem = (props) => {
  const {
    title, edit, address,
    position, onTitleChange, className,
    onAddressChange, onRemove, noIcon
  } = props;


  return (
    <div className={classNames(s.wrapper, className)}>
      <Title size="6" light>
        <FlexGrid justify="start" align="center">
          {!noIcon && <Svg onClick={edit && onRemove}
                           src={edit ? closeIcon : pinIcon}
                           className={classNames(s.icon, edit && s.icon_click)} />}
          {edit && <InputClean onChange={onTitleChange}
                               placeholder="Как будет называться ваш адрес?"
                               defaultValue={title}/>}
          {!edit && <span>{title}</span>}
        </FlexGrid>
      </Title>
      <Content size="3">
        {edit && <AddressInput onChange={onAddressChange} inherit
                               noMessage setPoint={onAddressChange}
                               placeholder="Где будет находиться ваш адрес?"
                               defaultValue={address}/>}
        {!edit && address}
      </Content>
      <Map point={{position}} options={mapSettings} className={s.map}/>
    </div>
  )
};

export default UserCustomAddressItem;

