import React, { Component } from 'react'
import { ProFilter } from 'components'
import s from './ItemPageParameters.sass'


export default class ItemPageParameters extends Component {
  render() {
    const { getRef, data, onChange } = this.props;

    return (
      <div ref={getRef} className={s.wrapper}>
        <ProFilter onChange={onChange} readOnly data={data}/>
      </div>
    )
  }
}

