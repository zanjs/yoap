import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { ItemPageParameters, Container } from 'components'


@inject(({filter}) => ({
  parseTypes: filter.getActiveParametersFromData
}))
export default class ItemPageParametersContainer extends Component {

  onChange = () => {
    console.log('changed');
    if (this.props.onChange) {
      this.props.onChange()
    }
  };

  getRef = b => this.wrapper = b;

  render() {
    const {
      props: {data, size, parseTypes, edit},
      getRef, onChange
    } = this;
    const _data = data && data.length && parseTypes(data);

    return (
      <Container getRef={getRef}>
        <ItemPageParameters edit={edit} data={_data} size={size}
                            onChange={onChange}/>
      </Container>
    )
  }
}

