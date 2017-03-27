import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  ItemPageLocation,
  Map, MapMarker
} from 'components'


export default class ItemPageLocationContainer extends Component {
  state = {
    point: {
      position: [59.8103184, 30.362779]
    }
  };

  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      shouldUpdate, data
    } = this.props;
    const {
      point
    } = this.state;

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <Map wrapperClassName={mapClassName}
             markerComponent={MapMarker}
             markerProps={data} point={point}
             className={mapClassName} />
      )}>
        <ItemPageLocation data={data.location} />
      </ItemPageInfoScroller>
    )
  }
}

