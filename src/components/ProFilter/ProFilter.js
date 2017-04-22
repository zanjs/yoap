import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { ItemParams, ItemParamsRowSize } from 'components'

@observer
export default class ProFilter extends Component {
  render() {
    const { data, size, readOnly, onChange, edit } = this.props;
    return (
      <ItemParams onChange={onChange} edit={edit}
                  readOnly={readOnly} data={data}>
        {size && <ItemParamsRowSize edit={edit} readOnly={readOnly}
                                    title="Комнаты и кровати" {...size}/>}
      </ItemParams>
    )
  }
}

