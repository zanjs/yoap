import React, { Component } from 'react'
import {
  ItemPageInfoTitle, Content,
  FlexGrid, Svg, InputClean,
  NearestStations,
  AddressInput
} from 'components'
import { classNames } from 'helpers'
import s from './ItemPageLocation.sass'

import subwayIcon from 'icons/ui/subway.svg'
import workIcon from 'icons/work.svg'
import houseIcon from 'icons/ui/house.svg'
import tramIcon from 'icons/ui/tram.svg'
import subwayTrainIcon from 'icons/ui/subway-train.svg'
import taxiIcon from 'icons/ui/taxi.svg'
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

export default class ItemPageLocation extends Component {
  static mapClassName = s.map;

  getTimingData = item => {
    let newItem = {...item};

    newItem.distance = newItem.distance > 1000 ?
      `${newItem.distance / 1000} км` : `${newItem.distance} м`;

    switch (item.type) {
      case 'center':
        return {
          ...newItem,
          src: houseIcon
        };
      case 'work':
        return {
          ...newItem,
          src: workIcon
        };
      default:
        return newItem;
    }
  };

  renderStation = ({name, color, duration, distance, position, isActive}) => (
    <Point onClick={() => this.props.setDirection(position)}
           isActive={isActive} fill={color} title={name}>
      {`${duration} / ${distance}`}
    </Point>
  );

  render() {
    const {
      className, edit, point, direction,
      data: { address, subway, timing },
    } = this.props;
    return (
      <div className={classNames(s.wrapper, className)}>
        <div className={s.item}>
          <ItemPageInfoTitle title="Адрес"/>
          {edit && <AddressInput defaultValue={address}
                                 setPoint={this.props.setPoint}/>}
          {!edit && <Content size="2" light lightColor>{address}</Content>}
        </div>
        {subway && <div className={s.item}>
          <ItemPageInfoTitle title="Ближайшее метро"/>
          <NearestStations direction={direction}
                           point={point}
                           render={this.renderStation}/>
          {/*{subway.map((item, key) => (*/}
            {/*<Point key={key} fill="#EE5450" title={item.name}>*/}
              {/*{`${item.time} мин / ${item.distance} м`}*/}
            {/*</Point>*/}
          {/*))}*/}
        </div>}
        {timing && <div className={s.item}>
          <ItemPageInfoTitle title="Время в пути"/>
          {timing.map((item, key) => {
            const { name, time, distance, src} = this.getTimingData(item);
            return (
              <Point src={src || houseIcon} key={key} title={name}>
                {`${time} мин / ${distance}`}
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

