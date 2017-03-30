import React, { Component } from 'react'
import {
  ItemPageInfoScroller,
  ItemPageLocation
} from 'components'
import { MapContainer } from 'containers'
import { isEmpty } from 'helpers'


export default class ItemPageLocationContainer extends Component {
  state = {
    address: null,
    direction: null
  };

  setPoint = address =>
    this.setState({address});
  setDirection = position => {
    this.setState({direction: {
      method: false,
      position
    }});
  };

  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      setPoint,
      setDirection
    } = this;
    const {
      address,
      direction
    } = this.state;
    const {
      shouldUpdate, data, edit
    } = this.props;

    let pointData = {
      position: data.location.location,
      props: { data }
    };

    if (!isEmpty(address)) {
      pointData = address;
    }

    return (
      <ItemPageInfoScroller shouldUpdate={shouldUpdate} fixed={(
        <MapContainer wrapperClassName={mapClassName}
                      className={mapClassName}
                      direction={direction}
                      point={pointData}/>
      )}>
        <ItemPageLocation setPoint={setPoint} point={pointData}
                          setDirection={setDirection} direction={direction}
                          edit={edit} data={data.location} />
      </ItemPageInfoScroller>
    )
  }
}

