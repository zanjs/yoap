import React, { Component } from 'react'
import { Title, Content, Svg, FlexGrid } from 'components'
import s from './UserCustomAddressItem.sass'
import workIcon from 'icons/work.svg';


const UserCustomAddressItem = ({title, address}) => {
  return (
    <div className={s.wrapper}>
      <Title size="6" light>
        <FlexGrid justify="start" align="center">
          <Svg className={s.icon} src={workIcon}/>
          <span>{title}</span>
        </FlexGrid>
      </Title>
      <Content size="3">{address}</Content>
      <div className={s.map} />
    </div>
  )
};

export default UserCustomAddressItem;

