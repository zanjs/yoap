import React, { Component } from 'react'
import {
  Title, Content, Svg,
  FlexGrid, InputClean,
  AddressInput, Map
} from 'components'
import { classNames } from 'helpers'
import s from './UserCustomAddressItem.sass'

import cityIcon from 'icons/ui/city.svg'
import workIcon from 'icons/ui/work.svg'


const mapSettings = {
  disableDefaultUI: true,
  fullscreenControl: false,
  scaleControl: false,
  scrollwheel: false,
  streetViewControl: false,
  zoomControl: true
};

const getIcon = name => {
  switch (name) {
    case 'work':
      return workIcon;
    case 'center':
    case 'city':
      return cityIcon;
  }

  return null;
}

const UserCustomAddressItem = (props) => {
  const {
    title, edit, address, iconName,
    position, onTitleChange, className,
    onAddressChange
  } = props;
  const icon = getIcon(iconName);

  return (
    <div className={classNames(s.wrapper, className)}>
      <Title size="6" light>
        <FlexGrid justify="start" align="center">
          {icon && <Svg className={s.icon} src={icon}/>}
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

