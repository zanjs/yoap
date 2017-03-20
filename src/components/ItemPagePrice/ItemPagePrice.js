import React, { Component } from 'react'
import {
  Content, FlexGrid,
  ItemPageInfoTitle,
  Select, InputClean
} from 'components'
import { termTypes } from 'constants'
import s from './ItemPagePrice.sass'

const types = termTypes.types;
const typesValues = types.map(
  item => item.name
);

const data = [
  {
    name: 'Сутки',
    value: '1400'
  },
  {
    name: 'Неделя',
    value: '8000'
  },
  {
    name: 'Месяц',
    value: '40000'
  },
  {
    name: 'Полгода',
    value: '230000'
  },
  {
    name: 'Год',
    value: '4600000'
  }
]

export default class ItemPagePrice extends Component {
  types = types;

  state = {edit: false, chosen: []}

  toggleEditMode = val =>
    this.setState(({edit}) => ({
      edit: val != null ? val : !edit
    }))

  togglePrices = value => {
    let data;

    if (typeof value === 'string' || !value.id || !value.name) {
      if (typeof value !== 'string') {
        value = value.target.value;
      }

      data = types.find(
        item => item.name === value || item.id === value
      )
    }

    const chosenData = data || value;;
    const { id } = chosenData;
    const { chosen } = this.state;
    const hasAdded = !!chosen.find(item => item.id === id);

    if (hasAdded) {
      return this.setState({
        chosen: chosen.filter(item => item.id !== id),
        edit: false
      })
    }

    return this.setState({
      chosen: [
        ...chosen,
        chosenData
      ],
      edit: false
    })
  }

  renderEditSelect() {
    const types = this.types.filter(item => {
      const hasAdded = !!this.state.chosen.find(
        value => item.id === value.id
      );

      return !hasAdded;
    }).map(item => item.name);

    if (!types && !types.length)
      return null;

    if (types.length === 1) {
      this.togglePrices(types[0]);

      return null;
    }

    return (
      <Content lightColor light size="2" nooffsets>
        <Select className={s.select}
                onChange={this.togglePrices} values={types}/>
      </Content>
    )
  }
  changePrice(id, value) {
    this.setState(({chosen}) => ({
      chosen: chosen.map(item => {
        if (item.id === id) {
          item.value = parseInt(value, 10);
        }

        return item;
      })
    }))
  }
  renderEditInput({value, id}) {
    return (
      <Content lightColor regular size="3" nooffsets>
        <FlexGrid tag="span" justify="start" align="center">
          <InputClean type="number" min="0" step="500"
                      onChange={({target}) => this.changePrice(id, target.value)}
                      className={s.inputNumber}>
            {value || 0}
          </InputClean>
          <span>₽</span>
        </FlexGrid>
      </Content>
    )
  }
  renderEdit() {
    const { edit, chosen } = this.state;
    const maximum = chosen.length === this.types.length;
    return (
      <div className={s.wrapper}>
        <ItemPageInfoTitle title="Стоимость"/>

        <FlexGrid className={s.grid} wrap="true" justify="start" align="start">
          {!!chosen && !!chosen.length && chosen.map((item, key) => (
            <FlexGrid key={key} className={s.item} align="center"
                      justify="space-between">
              <Content lightColor light size="2" nooffsets>
                {item.name}
              </Content>
              {this.renderEditInput(item)}
            </FlexGrid>
          ))}
          {!maximum && !edit && <Content lightColor regular size="3" className={s.add}
                             nooffsets onClick={this.toggleEditMode}>+</Content>}
          {edit && this.renderEditSelect()}
        </FlexGrid>
      </div>
    )
  }

  render() {
    if (this.props.edit) {
      return this.renderEdit();
    }

    return (
      <div className={s.wrapper}>
        <ItemPageInfoTitle title="Стоимость"/>
        <FlexGrid className={s.grid} wrap="true" justify="start" align="start">
          {data.map(({name, value}, key) => (
            <FlexGrid key={key} className={s.item} align="center"
                      justify="space-between">
              <Content lightColor light size="2" nooffsets>
                {name}
              </Content>
              <Content lightColor regular size="3" nooffsets>
                {`₽${value}`}
              </Content>
            </FlexGrid>
          ))}
        </FlexGrid>
      </div>
    )
  }
}
