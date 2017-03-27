import React, { Component, PropTypes } from 'react'
import { Provider } from 'mobx-react'
import { store } from 'store'
import { BrowserRouter as Router } from 'react-router-dom'
import { Svg, MapMarker } from 'components'
import {
  loop, classNames, Map as MapClass
} from 'helpers'
import { map as config } from 'config'
import s from './Map.sass'

import locationIcon from 'icons/ui/location.svg'
//import locationIconPng from 'icons/ui/location.png'


export default class Map extends Component {
  static defaultProps = {currentPoint: {position: []}};
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  state = {isLoaded: false};

  componentWillMount() {
    this.MapObject = new MapClass(({
      onLoad: this.onLoadLibrary
    }))
  }
  componentWillUnmount() {
    this.isUnmounted = true;
  }


  onLoadLibrary = () => {
    if (this.isUnmounted || this.state.isLoaded) return false;

    this.setState({isLoaded: true}, () => {
      this.initMap();
    });
  };

  simulateRouter = context => {
    return class Router extends Component {
      static childContextTypes = {
        router: PropTypes.object
      };
      getChildContext() {
        return context;
      }
      render() {
        return this.props.children;
      }
    }
  };

  createMarker = data => {
    const Router = this.simulateRouter(this.context);
    console.log(data);

    return this.MapObject.createMarker({
      data, map: this.map,
      className: s.marker,
      render: (
        <Provider {...store}>
          <Router>
            <MapMarker {...data.props}/>
          </Router>
        </Provider>
      )
    })
  };


  // initialize map
  initMap = () => {
    const {
      MapObject, props: {
        point, points
      }
    } = this;
    this.markers = [];
    this.map = MapObject.createMap(this.mapBlock, this.props.options);

    this.transitLayer = new MapObject.TransitLayer();
    this.transitLayer.setMap(this.map);

    if (point) {
      this.setPoint(point);
    }

    if (points) {
      this.createNewMarkers(points);
    }

    // onLoad
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  };

  // add just one marker
  addMarker = (mark, isTemp) => {
    if (!this.markers) this.markers = [];
    const marker = this.createMarker(mark);

    marker.isTemp = isTemp;

    this.markers.push(marker);
  };
  // add markers from array
  addMarkers = (data) => loop(data, this.addMarker);

  deleteMarkers = () => {
    if (!this.markers) return;
    loop(this.markers, (marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  };

  setPoint = (point) => {
    if (!point.position) return;

    this.zoomPoint(point);
    this.deleteMarkers();
    this.addMarker(point, true);
  };

  zoomPoint = ({position: [lat, lng], zoom}) => {
    this.map.setCenter({lat, lng});
    this.map.setZoom(zoom || config.onSetPointZoom);
  };

  createNewMarkers = (data) => {
    const { options: {center, zoom}, points } = config;
    this.deleteMarkers();
    this.addMarkers(data || points);
    this.zoomPoint({position: center, zoom})
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) return;

    const { props } = this;
    const { currentPoint } = nextProps;
    const isSettingPoint = currentPoint && currentPoint.position
        && currentPoint.position.length > 1
        && (!props.currentPoint || !props.currentPoint.position || props.currentPoint.length < 1 || (
        currentPoint.position[0] !== props.currentPoint.position[0] ||
        currentPoint.position[1] !== props.currentPoint.position[1]
      ));

    if (isSettingPoint) {
      this.setPoint(nextProps.currentPoint);
      console.log('set point')
    } else if (!nextProps.currentPoint) {
      console.log('create new markers cuz poins is empty');
      this.createNewMarkers();
    }

    if (nextProps.points && nextProps.points !== props.points) {
      if (nextProps.points.length > 0 && !isSettingPoint) {
        console.log('create new markers from points');
        this.createNewMarkers(nextProps.points);
      }
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { className, wrapperClassName, style } = this.props;
    return (
      <div className={classNames(s.wrapper, wrapperClassName)} style={style}>
        <div className={classNames(s.map, className)} ref={b => this.mapBlock = b}
             style={{display: isLoaded ? 'block' : 'none'}}/>
        {!isLoaded && <div className={classNames(s.map, className)}>
          <Svg src={locationIcon} className={s.location}/>
        </div>}
      </div>
    )
  }
}

