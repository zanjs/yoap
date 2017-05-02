import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  ItemPageInfoTitle, Content,
  FlexGrid, Svg, InputClean,
  NearestStations,
  AddressInput
} from 'components'
import { classNames } from 'helpers'
import s from './ItemPageLocation.sass'

import subwayIcon from 'icons/ui/subway.svg'
import workIcon from 'icons/ui/work.svg'
import houseIcon from 'icons/ui/house.svg'
import tramIcon from 'icons/ui/tram.svg'
import subwayTrainIcon from 'icons/ui/subway-train.svg'
import taxiIcon from 'icons/ui/taxi.svg'
import busIcon from 'icons/ui/bus.svg'
import pinIcon from 'icons/ui/location.svg'

const Point = props => {
  const {
    src = subwayIcon, isActive, fill = '#afafaf',
    title, children, onClick
  } = props;

  return (
    <FlexGrid onClick={onClick} justify="space-between" align="center"
              className={classNames(s.point, isActive && s.point_active)}>
      <FlexGrid justify="start"  align="center"
                className={s.point__title}>
        <Svg style={{fill}} src={src}
             className={s.point__icon} />
        <Content size="2" nooffsets lightColor light>{title}</Content>
      </FlexGrid>
      <Content className={s.point__dist}
               size="3" nooffsets lightColor regular>{children}</Content>
    </FlexGrid>
  )
};

@observer
export default class ItemPageLocation extends Component {
  static defaultProps = {
    data: {}
  };
  static mapClassName = s.map;

  getTimingData = item => {
    let newItem = {...item};

    newItem.distance = newItem.distance > 1000 ?
      `${newItem.distance / 1000} км` : `${newItem.distance} м`;

    switch (item.type) {
      case 'center':
        newItem = {
          ...newItem,
          src: houseIcon
        };
      case 'work':
        newItem = {
          ...newItem,
          src: workIcon
        };
    }

    return {
      ...newItem,
      method: this.props.method
    }
  };

  renderStation = ({name, color, duration, distance, position, isActive}) => (
    <Point onClick={() => this.props.setDirection(position)}
           isActive={isActive} fill={color} title={name}>
      {`${duration} / ${distance}`}
    </Point>
  );

  onStationChange = props => {
    if (this.props.onStationChange) {
      this.props.onStationChange(props)
    }
  };

  render() {
    const {
      className, edit, point, direction,
      onStationChange, timing,
      data: { address, subway },
    } = this.props;
    return (
      <div className={classNames(s.wrapper, className)}>
        <div className={s.item}>
          <ItemPageInfoTitle title="Адрес"/>
          {edit && <AddressInput defaultValue={address}
                                 setPoint={this.props.setPoint}/>}
          {!edit && <Content size="2" light lightColor>{address}</Content>}
        </div>
        <div className={s.item}>
          <ItemPageInfoTitle title="Ближайшее метро"/>
          <NearestStations direction={direction} defaultData={subway}
                           point={point} onChange={onStationChange}
                           render={this.renderStation}/>
        </div>
        {timing && !!timing.length && <div className={s.item}>
          <ItemPageInfoTitle title="Время в пути"/>
          {timing.map((__item, key) => {
            const item = this.getTimingData(__item);
            return (
              <Point onClick={() => this.props.setDirection(item)}
                     src={item.src || pinIcon} key={key} title={item.name}>
                {`${item.time} / ${item.distance}`}
              </Point>
            )
          })}
        </div>}
        <div className={s.item}>
          <ItemPageInfoTitle title="Доступность транспорта"/>
          <FlexGrid justify="start" align="center" className={s.icons}>
            <Svg src={busIcon} className={classNames(s.icon, s.icon_active)} />
            <Svg src={tramIcon} className={s.icon} />
            <Svg src={subwayTrainIcon} className={s.icon} />
            <Svg src={taxiIcon} className={s.icon} />
          </FlexGrid>
          <Content size="3" light lightColor>
            54, 3, 26, 91, 141
          </Content>
        </div>
      </div>
    )
  }
}

