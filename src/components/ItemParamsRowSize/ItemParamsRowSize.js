import React, { Component } from 'react'
import {
  ItemParamsRow, Content, InputNumber,
  FlexGrid, FilterSlider
} from 'components'
import { classNames } from 'helpers'
import s from './ItemParamsRowSize.sass'

const Item = ({children, noinput, className, onChange, ...rest}) => (
  <Content size="2" light tag="div"
           className={classNames(
             ItemParamsRow.itemClassName, s.item,
             className
           )}>
    {!noinput && <InputNumber className={s.input} onChange={onChange} {...rest}>
      {children}
    </InputNumber>}
    {noinput && children}
  </Content>
)


export default class ItemParamsRowSize extends Component {
  state = {value: 0}
  onBedRoomsChange = value => this.props.onBedRoomsChange(
    value
  )
  onBedsChange = value => this.props.onBedsChange(
    value
  )
  onBathRoomsChange = value => this.props.onBathRoomsChange(
    value
  )
  onFloorChange = value => this.props.onFloorChange(
    value
  )
  onSquaresChange = (min, max) => this.props.onSquaresChange(
    [min, max]
  )

  render() {
    const {
      title,

      bedrooms, beds, floor,
      bathrooms, squares,
    } = this.props;
    return (
      <div className={s.wrapper}>
        <ItemParamsRow title={title}>
          <Item onChange={this.onBedRoomsChange}>
            {bedrooms}+ спален
          </Item>
          <Item onChange={this.onBedsChange}>
            {beds}+ спален
          </Item>
          <Item onChange={this.onBathRoomsChange} step={0.5}>
            {bathrooms}+ ванных
          </Item>
          <Item onChange={this.onFloorChange}>
            {floor}+ этаж
          </Item>

          <Item noinput className={s.item_big}>
            <FilterSlider min={squares[0]} max={squares[1]}
                          onChange={this.onSquaresChange}/>
          </Item>
        </ItemParamsRow>
      </div>
    )
  }
}

