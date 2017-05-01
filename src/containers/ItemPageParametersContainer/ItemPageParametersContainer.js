import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ItemPageParameters, Container } from 'components'

const mapStateToProps = ({filter}) => ({
  parseTypes: filter.getActiveParametersFromData
});

@inject(mapStateToProps) @observer
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

