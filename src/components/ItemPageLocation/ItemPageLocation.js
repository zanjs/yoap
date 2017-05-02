import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
  ItemPageInfoTitle, Content,
  FlexGrid, Svg,
  NearestStations,
  AddressInput
} from 'components'
import { classNames, shallowEqual } from 'helpers'
import s from './ItemPageLocation.sass'

const drivingMethod = 'DRIVING';
const busMethod = 'TRANSIT';
const walkMethod = 'WALKING';

import subwayIcon from 'icons/ui/subway.svg'
import workIcon from 'icons/ui/work.svg'
import houseIcon from 'icons/ui/house.svg'
import pinIcon from 'icons/ui/location.svg'
import carIcon from 'icons/ui/car.svg'
import walkIcon from 'icons/ui/walk.svg'
import busIcon from 'icons/ui/bus.svg'

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
      `${newItem.distance / 1000} км` : `${newItem.distance}`;

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

  setTimingDirection = item => {
    if (this.props.setDirection) {
      this.props.setDirection(item.position)
    }
  }
  createChangeMethod = method => () => {
    if (this.props.onMethodChange) {
      this.props.onMethodChange(method)
    }
  }

  isPointActive = (method, currentMethod) => (
    method.toLowerCase() === currentMethod.toLowerCase()
  )

  render() {
    const {
      className, edit, point, direction,
      onStationChange, timing, method,
      data: { address, subway },
    } = this.props;
    const { createChangeMethod, isPointActive } = this;
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
                           method={method} render={this.renderStation}/>
        </div>
        {timing && !!timing.length && <div className={s.item}>
          <ItemPageInfoTitle title="Время в пути"/>
          {timing.map((__item, key) => {
            const item = this.getTimingData(__item);
            return (
              <Point onClick={() => this.setTimingDirection(item)}
                     isActive={direction && shallowEqual(direction.position, item.position)}
                     src={item.src || pinIcon} key={key} title={item.name}>
                {`${item.time} / ${item.distance}`}
              </Point>
            )
          })}
        </div>}
        <div className={s.item}>
          <ItemPageInfoTitle title="Доступность транспорта"/>
          <FlexGrid justify="start" align="center" className={s.icons}>
            <Svg onClick={createChangeMethod(walkMethod)} src={walkIcon}
                 className={classNames(s.icon, isPointActive(walkMethod, method) && s.icon_active)} />
            <Svg onClick={createChangeMethod(busMethod)} src={busIcon}
                 className={classNames(s.icon, isPointActive(busMethod, method) && s.icon_active)} />
            <Svg onClick={createChangeMethod(drivingMethod)} src={carIcon}
                 className={classNames(s.icon, isPointActive(drivingMethod, method) && s.icon_active)} />
            {/*<Svg onClick={createChangeMethod('BICYCLING')}*/}
                 {/*src={bikeIcon} className={classNames(s.icon,)} />*/}
          </FlexGrid>
        </div>
      </div>
    )
  }
}

