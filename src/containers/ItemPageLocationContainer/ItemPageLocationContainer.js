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
    direction: null,
    subway: null
  };

  componentWillMount() {
    const { data } = this.props;

    if (data && data.location && data.location[0]) {
      // this.setState({
      //   address: {
      //     position: [...data.location],
      //     props: null
      //   },
      //   subway: data.subway
      // })
    }
  }

  setPoint = address =>
    this.setState({address}, this.onChange);
  setDirection = position => {
    this.setState({direction: {
      method: false,
      position
    }});
  };
  metroChangeHandler = subway => {
    this.setState({
      subway
    }, this.onChange)
  };
  onChange = () => {
    if (!this.props.onChange)
      return null;

    const { state } = this;
    const _address = state.address;
    const address = _address && _address.name;
    const location = _address && _address.position;
    const { subway } = state;

    this.props.onChange({
      address,
      location,
      subway
    })
  };

  getPointData = data => {
    if (!data)
      return null;

    if (data.location && data.location.location) {
      return {
        position: data.location.location,
        props: { data }
      }
    }

    return {
      position: data.location,
      props: {}
    }
  };

  getLocationData = () => {
    const { location, data } = this.props;

    if (location)
      return location;

    if (data.location && data.location.location)
      return data.location;

    return data;
  };

  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      state: {address, direction},
      props: {
        shouldUpdate, data, edit,
        onChange, location
      },
      setPoint,
      setDirection,
      metroChangeHandler
    } = this;

    const locationData = this.getLocationData();
    let pointData = this.getPointData(data);

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
                          onStationChange={metroChangeHandler} direction={direction}
                          setDirection={setDirection}
                          edit={edit} data={locationData} />
      </ItemPageInfoScroller>
    )
  }
}

