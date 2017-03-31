import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { ItemPageParameters, Container } from 'components'


@inject(({filter}) => ({
  parseTypes: filter.getActiveParametersFromData
}))
export default class ItemPageParametersContainer extends Component {
  getRef = b => this.wrapper = b;

  render() {
    const {
      props: {data, size, parseTypes, edit, onChange, onSizeChange},
      getRef
    } = this;

    const _data = data && data.length && (edit
        ? data
        : parseTypes(data)
      );

    return (
      <Container getRef={getRef}>
        <ItemPageParameters edit={edit} data={_data} size={size}
                            onChange={onChange}
                            onSizeChange={onSizeChange}/>
      </Container>
    )
  }
}

