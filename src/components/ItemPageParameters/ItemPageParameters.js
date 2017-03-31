import React, { Component } from 'react'
import { ProFilter } from 'components'
import { ProFilterContainer } from 'containers'
import s from './ItemPageParameters.sass'


export default class ItemPageParameters extends Component {
  render() {
    const {
      getRef, data, onChange, edit,
      size, onSizeChange
    } = this.props;

    return (
      <div ref={getRef} className={s.wrapper}>
        {!edit && <ProFilter onChange={onChange} readOnly={!edit}
                   edit={edit} size={size} data={data}/>}
        {edit && <ProFilterContainer size={size} data={data} edit={edit}
                                     onSizeChange={onSizeChange}
                                     onChange={onChange}/>}
      </div>
    )
  }
}

