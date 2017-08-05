import React, { Component } from 'react'
import { ItemTilesGrid } from 'components'
import { getScrollY, getNodePosition } from 'helpers'


export default class TilesGridContainer extends Component {
  offsetSize = 16;
  offset = this.offsetSize;

  enterHandler = () => {
    const { offset, offsetSize, props: {data} } = this;
    const length = data && data.length || 0;
    const newOffset = offset + offsetSize;

    if (!length)
      return false;

    if (newOffset > length) {
      if (offset >= length)
        return;

      this.offset = length;
      this.forceUpdate();

      return false;
    }

    this.offset = newOffset;
    this.forceUpdate();

    return false;
  };

  getData = () => {
    const { props: {data}, offset } = this;

    return data && data.filter((it, index) => (
      index < offset
    ))
  };

  scrollHandler = () => {
    const y = getScrollY(true);
    const { top } = getNodePosition(this.waypoint);

    if (y > top)
      return this.enterHandler();
  };

  setRef = b => this.waypoint = b;

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    return (
      <div>
        <ItemTilesGrid {...this.props} data={this.getData()}/>
        <div ref={this.setRef}/>
      </div>
    )
  }
}

