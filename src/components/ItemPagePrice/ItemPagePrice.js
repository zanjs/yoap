import React, { Component } from 'react'
import {
  Content, FlexGrid,
  ItemPageInfoTitle,
  Select
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
  state = {edit: false}

  toggleEditMode = val =>
    this.setState(({edit}) => ({
      edit: val != null ? val : !edit
    }))

  renderEdit() {
    const { data } = this.props;
    const { edit } = this.state;
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
          {!edit && <Content lightColor regular size="3" className={s.add}
                             nooffsets onClick={this.toggleEditMode}>+</Content>}
          {edit && <Select values={typesValues}/>}
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
