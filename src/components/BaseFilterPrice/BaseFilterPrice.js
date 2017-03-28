import React, { Component } from 'react'
import { BaseFilterItem, InputClean } from 'components'
import s from './BaseFilterPrice.sass'


export default class BaseFilterPrice extends Component {
  render() {
    return (
      <BaseFilterItem noborder title="Стоимость в месяц">
        <br/>
        от 45.000
        до 65.000
      </BaseFilterItem>
    )
  }
}

