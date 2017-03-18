import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { ProFilter } from 'components'


const mapStateToProps = ({
  filter: {
    data,
    size
  }
}) => ({
  data
});
@inject(mapStateToProps) @observer
export default class ProFilterContainer extends Component {
  render() {
    const { data } = this.props;

    return (
      <ProFilter data={data}/>
    )
  }
}

