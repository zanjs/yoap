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
  zoomControl: false
};

const getIcon = name => {
  switch (name) {
    case 'work':
      return workIcon;
    case 'center':
    case 'city':
      return cityIcon;
  }
}

const UserCustomAddressItem = (props) => {
  const {
    title, edit, address, iconName = 'work',
    onTitleChange, className, onAddressChange
  } = props;

  return (
    <div className={classNames(s.wrapper, className)}>
      <Title size="6" light>
        <FlexGrid justify="start" align="center">
          <Svg className={s.icon} src={getIcon(iconName)}/>
          {edit && <InputClean onChange={onTitleChange} defaultValue={title}/>}
          {!edit && <span>{title}</span>}
        </FlexGrid>
      </Title>
      <Content size="3">
        {edit && <AddressInput onChange={onAddressChange} defaultValue={address}/>}
        {!edit && address}
      </Content>
      <Map options={mapSettings} className={s.map}/>
    </div>
  )
};

export default UserCustomAddressItem;

