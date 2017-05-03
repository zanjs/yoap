import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  ItemPageInfoScroller,
  ItemPageLocation
} from 'components'
import { MapContainer } from 'containers'
import { isEmpty, getDirection, shallowEqual, getDefaultPersonalPoint } from 'helpers'

const mapStateToProps = ({items: {current}, user: {personalPoints}}) => ({
  data: current,
  personalPoints
})

@inject(mapStateToProps) @observer
export default class ItemPageLocationContainer extends Component {
  state = {
    address: null,
    direction: null,
    subway: null,
    timing: null,
    method: 'WALKING'
  };

  setPoint = address =>
    this.setState({address}, this.onChange);
  setDirection = position => {
    // method means walking, transit etc.
    this.setState({direction: {
      method: this.state.method,
      position
    }});
  };
  changeMethodHandler = method => {
    this.setState(state => {
      if (state.direction && state.direction.method) {
        return {
          method,
          direction: {
            ...state.direction,
            method
          }
        }
      }

      return {method};
    }, this.updateTiming)
  }
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
  updateTiming = (props = this.props) => {
    const point = this.getPointData(props.data);
    const { personalPoints = [] } = props;

    let __points = [
      getDefaultPersonalPoint(),
      ...personalPoints
    ];

    Promise.all(__points.map(item => {
      return getDirection(point, {
        ...item,
        method: this.state.method
      })
    })).then(props => {
      if (!props || !props.length)
        return null;

      let data = props.map((item, index) => {
        const point = __points[index];
        let newItem = {
          distance: item.length,
          time: item.duration,
          position: point.position
        };

        if (point.title) {
          newItem.name = point.title;
        }

        return newItem;
      })

      this.setState({ timing: data }, this.props.onChange);
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    setTimeout(this.updateTiming, 1000);
  }
  componentWillUpdate(props, state) {
    if (props.personalPoints.length) {
      if (!this.state.timing || !this.state.timing.length) {
        return this.updateTiming(props);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props.personalPoints, nextProps.personalPoints)) {
      this.updateTiming(nextProps);
    }
  }

  render() {
    const { mapClassName } = ItemPageLocation;
    const {
      state: {
        address, direction, timing,
        method
      },
      props: {
        shouldUpdate, data
      },
      setPoint,
      setDirection,
      metroChangeHandler,
      changeMethodHandler
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
                          timing={timing} method={method}
                          direction={direction} data={locationData}
                          onStationChange={metroChangeHandler}
                          onMethodChange={changeMethodHandler}
                          setDirection={setDirection}/>
      </ItemPageInfoScroller>
    )
  }
}

