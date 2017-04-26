import React, { Component } from 'react'
import { BaseFilterContainer, ProFilterContainer } from 'containers'



export default class FilterContainer extends Component {
  state = { isFilterFull: false };
  toggleFull = () => this.setState(state => ({
    isFilterFull: !state.isFilterFull
  }))

  render() {
    const { isFilterFull } = this.state;
    return (
      <div>
        <BaseFilterContainer isFull={isFilterFull} refresh
                             onMoreButtonClick={this.toggleFull} />
        {isFilterFull && <ProFilterContainer />}
      </div>
    )
  }
}

