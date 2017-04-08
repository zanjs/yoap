import React, { Component } from 'react'
import { BaseFilter } from 'components'


export default class BaseFilterContainer extends Component {
  render() {
    return <BaseFilter {...this.props} />
  }
}

