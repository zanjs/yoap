import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageInfoScroller,
  ItemPageLocation
} from 'components'
import { MapContainer } from 'containers'
import { isEmpty } from 'helpers'

const mapStateToProps = ({manage: {data, changeData}}) => ({
  data: data.location,
  changeData
});

@inject(mapStateToProps) @observer
export default class ItemLocationEdit extends Component {
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
    // method means walking, transit etc.
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
  changeData = location => {
    if (this.props.changeData) {
      this.props.changeData({location});
    }
  };
  onChange = () => {
    const { state } = this;
    const _address = state.address;
    const address = _address && _address.name;
    const location = _address && _address.position;
    const { subway } = state;

    this.changeData({
      address,
      location,
      subway
    });

    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
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
        shouldUpdate, data
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
                          edit data={locationData} />
      </ItemPageInfoScroller>
    )
  }
}

