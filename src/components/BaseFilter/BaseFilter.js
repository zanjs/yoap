import React, { Component } from 'react'
import { Content, Title, Svg, FlexGrid, Link } from 'components'
import s from './BaseFilter.sass'

import roomsIcon from 'icons/ui/rooms-amount.svg'
import subwayIcon from 'icons/ui/subway.svg'
import houseIcon from 'icons/ui/house.svg'


const BaseFilterItem = ({title, icon, children}) => (
  <div className={s.item}>
    <Content className={s.item__title} gray>{title}</Content>
    {icon && <Svg className={s.item__icon} src={icon}/>}
    <Title size="4" regular light className={s.item__content}>{children}</Title>
  </div>
)

export default class BaseFilter extends Component {
  render() {
    const { children, onMoreButtonClick, isFull } = this.props;
    return (
      <div className={s.container}>
        <FlexGrid justify="space-between" className={s.wrapper}>
          <BaseFilterItem title="Количество комнат" icon={roomsIcon}>
            1 2 3 4 5 6
          </BaseFilterItem>
          <BaseFilterItem title="Ближайшее метро" icon={subwayIcon}>
            Звенигородская
          </BaseFilterItem>
          <BaseFilterItem title="Категория объекта" icon={houseIcon}>
            Комфорт
          </BaseFilterItem>
          <BaseFilterItem title="Стоимость в месяц">
            <br/>
            от 45.000 <br />
            до 65.000
          </BaseFilterItem>
        </FlexGrid>
        <Link onClick={onMoreButtonClick} className={s.more} gray tag="span">
          {isFull ? 'Меньше параметров' : 'Больше параметров'}
        </Link>
      </div>
    )
  }
}

