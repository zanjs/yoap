import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BaseFilter } from 'components'

const mapStateToProps = ({filter: {find}}) => ({
  onSearchClick: find
});

@inject(mapStateToProps) @observer
export default class BaseFilterContainer extends Component {
  render() {
    return <BaseFilter {...this.props} />
  }
}

