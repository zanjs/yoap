import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BaseFilterCategory } from 'components'

const mapStateToProps = ({filter: { setCategory, types, category }}) => ({
  data: types, setCategory, category
});
@inject(mapStateToProps) @observer
export default class BaseFilterCategoryContainer extends Component {
  render() {
    return (
      <BaseFilterCategory {...this.props}/>
    )
  }
}

