import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  ItemPageLocation,
  Map, MapMarker
} from 'components'


export default class ItemPageLocationContainer extends Component {
  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      shouldUpdate, data
    } = this.props;

    const pointData = {
      position: data.location.location,
      props: data
    };

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <Map wrapperClassName={mapClassName}
             point={pointData}
             className={mapClassName} />
      )}>
        <ItemPageLocation data={data.location} />
      </ItemPageInfoScroller>
    )
  }
}

