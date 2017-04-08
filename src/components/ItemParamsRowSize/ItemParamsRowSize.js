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
  state = {value: 0};
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
  onFloorChangeAmount = value => {
    const floors = [parseInt(value, 10), this.props.floors[1]];

    this.props.onFloorChange(
      floors
    );
  };
  onRoomsChange = value => {
    const rooms = parseInt(value, 10);

    this.props.onRoomsChange(
      rooms
    );
  };
  onFloorChangeSum = value => {
    const floors = [this.props.floors[0], parseInt(value,10)];

    this.props.onFloorChange(
      floors
    );
  };
  onSquaresChange = (min, max) => this.props.onSquaresChange(
    [min, max]
  );
  onSquaresChangeOne = ({target: {value}}) =>
    this.props.onSquaresChange(
      value
    );

  render() {
    const {
      title, readOnly, edit,

      bedrooms = 0, beds = 0, floor = 0, rooms,
      bathrooms = 0, squares = [0, 100], floors = [0,0],
      squaresLimit = [0, 100]
    } = this.props;
    const splitter = (readOnly || edit) ? '' : '+';

    return (
      <div className={s.wrapper}>
        <ItemParamsRow title={title}>
          <Item noinput={readOnly} onChange={this.onBedRoomsChange}>
            {`${bedrooms}${splitter} спален`}
          </Item>
          <Item noinput={readOnly} onChange={this.onBedsChange}>
            {`${beds}${splitter} кроватей`}
          </Item>
          <Item noinput={readOnly} onChange={this.onBathRoomsChange} step={0.5}>
            {`${bathrooms}${splitter} ванных`}
          </Item>
          <Item noinput={readOnly}
                onChange={edit ? this.onFloorChangeAmount : this.onFloorChange}>
            {readOnly ? `${floors[0]}/${floors[1]} этаж` : `${floors[0] || floor}${splitter} этаж`}
          </Item>
          {edit && <Item onChange={this.onFloorChangeSum}>
            {`${floors[1] || floor} этажей`}
          </Item>}
          {edit && <Item className={s.item_big} onChange={this.onRoomsChange}>
            {`${rooms} общее кол. комнат`}
          </Item>}

          <Item readOnly={readOnly} noinput className={s.item_big}>
            {edit && <FlexGrid justify="start" align="center">
              <span className={s.label}>Общая площадь:</span>
              <InputClean className={s.squares} focus min="0"
                          onChange={this.onSquaresChangeOne}
                          step="5" type="number" defaultValue={squares || 0}/>
              <span className={s.label_last}>кв. м</span>
            </FlexGrid>}
            {!edit && readOnly && <span>Общая площадь: {squares} кв. м</span>}
            {!edit && !readOnly &&
            <FilterSlider minValue={squaresLimit[0]}
                          maxValue={squaresLimit[1]}
                          min={squares[0]}
                          max={squares[1]}
                          onChange={this.onSquaresChange}/>}
          </Item>
        </ItemParamsRow>
      </div>
    )
  }
}

