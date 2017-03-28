import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  ItemPageLocation
} from 'components'
import { MapContainer } from 'containers'


export default class ItemPageLocationContainer extends Component {
  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      shouldUpdate, data
    } = this.props;

    const pointData = {
      position: data.location.location,
      props: { data }
    };

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <MapContainer wrapperClassName={mapClassName}
                      className={mapClassName}
                      point={pointData}/>
      )}>
        <ItemPageLocation data={data.location} />
      </ItemPageInfoScroller>
    )
  }
}

