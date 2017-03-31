import React, { Component } from 'react'
import {
  ItemParamsRow, Content, InputNumber,
  FlexGrid, FilterSlider, InputClean
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
);


export default class ItemParamsRowSize extends Component {
  state = {value: 0}
  onBedRoomsChange = value => this.props.onBedRoomsChange(
    value
  );
  onBedsChange = value => this.props.onBedsChange(
    value
  );
  onBathRoomsChange = value => this.props.onBathRoomsChange(
    value
  );
  onFloorChange = value => this.props.onFloorChange(
    value
  );
  onSquaresChange = (min, max) => this.props.onSquaresChange(
    [min, max]
  );

  render() {
    const {
      title, readOnly, edit,

      bedrooms = 0, beds = 0, floor = 0,
      bathrooms = 0, squares = 0, floors = [0,0]
    } = this.props;

    return (
      <div className={s.wrapper}>
        <ItemParamsRow title={title}>
          <Item noinput={readOnly} onChange={this.onBedRoomsChange}>
            {readOnly ? `${bedrooms} спален` : `${bedrooms}+ спален`}
          </Item>
          <Item noinput={readOnly} onChange={this.onBedsChange}>
            {readOnly ? `${beds} кроватей` : `${beds}+ кроватей`}
          </Item>
          <Item noinput={readOnly} onChange={this.onBathRoomsChange} step={0.5}>
            {readOnly ? `${bathrooms} ванных` : `${bathrooms}+ ванных`}
          </Item>
          <Item noinput={readOnly} onChange={this.onFloorChange}>
            {readOnly ? `${floors[0]}/${floors[1]} этаж` : `${floor}+ этаж`}
          </Item>

          <Item readOnly={readOnly} noinput className={s.item_big}>
            {edit && <FlexGrid justify="start" align="center">
              <span className={s.label}>Общая площадь:</span>
              <InputClean className={s.squares} focus min="0"
                          step="5" type="number" defaultValue={squares}/>
              <span className={s.label_last}>кв. м</span>
            </FlexGrid>}
            {!edit && readOnly && <span>Общая площадь: {squares} кв. м</span>}
            {!edit && !readOnly && <FilterSlider min={squares[0]} max={squares[1]}
                          onChange={this.onSquaresChange}/>}
          </Item>
        </ItemParamsRow>
      </div>
    )
  }
}

