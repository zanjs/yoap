import React, { Component, PropTypes } from 'react'
import {
  render as mount,
  unmountComponentAtNode as unmount
} from 'react-dom'
import { Svg, MapMarker, RouterStoreProvider } from 'components'
import { isEmpty, loop, classNames, loadScript, shallowEqual } from 'helpers'
import { map as config } from 'config'
import s from './Map.sass'

import locationIcon from 'icons/ui/location.svg'
import bulletIconPng from 'images/ui/bullet.png'
//import locationIconPng from 'icons/ui/location.png'


export default class Map extends Component {
  static defaultProps = {
    point: {position: []},
    direction: {position: []}
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {isLoaded: false};
  loading = false;

  // load google maps
  loadLibrary = () => {
    if (this.loading || this.state.isLoaded) return false;

    this.loading = true;

    const { scriptId, link } = config;

    loadScript(link, () => {
      return this.onLoadLibrary();
    }, scriptId);
  };
  // on load google maps callback
  onLoadLibrary = () => {
    if (this.isUnmounted || this.state.isLoaded) return false;

    this.setState({isLoaded: true}, () => {
      this.initMap();
    });
  };

  // create marker
  createMarker = data => {
    const {
      Marker, InfoWindow, LatLng, event,
      Size, MarkerImage
    } = window.google.maps;
    const wrapper = document.createElement('div');
    const size = 32;
    const withWindow = !!data.props;

    wrapper.className = s.marker;
    const ReactElement = withWindow && mount(
      this.renderMarker(data),
      wrapper
    );

    const icon = new MarkerImage(
      bulletIconPng,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new Size(size, size)
    );

    const marker = new Marker({
      position: new LatLng(data.position[0], data.position[1]),
      title: data.title,
      icon, map: this.map
    });

    const infowindow = withWindow && new InfoWindow({
      content: wrapper
    });

    withWindow && event.addListener(marker, 'click', () => {
      infowindow.open(this.map, marker);
    });

    withWindow && event.addListener(infowindow, 'domready', () => {
      if (marker.ReactElement) {
        marker.ReactElement.forceUpdate();
      }
    });

    marker.block = wrapper;
    marker.ReactElement = ReactElement;

    return marker;
  };
  // render marker by react
  renderMarker = data => {
    if (!data.props) {
      return <noscript />
    }

    return (
      <RouterStoreProvider router={this.context.router}>
        <MapMarker {...data.props}/>
      </RouterStoreProvider>
    )
  };
  // get map options
  getOptions = () => {
    const { center: [lat, lng], ...rest } = config.options;

    return this.options = {
      center: { lat, lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      ...rest,
      ...this.props.options,
    }
  };

  // initialize map
  initMap = () => {
    const { point, points } = this.props;
    this.map = new window.google.maps.Map(this.mapBlock, this.getOptions());

    this.transitLayer = new window.google.maps.TransitLayer();
    this.transitLayer.setMap(this.map);
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({
      suppressMarkers: true, suppressInfoWindows: true
    });

    if (points) {
      this.addMarkers(points);
    }

    if (point && point.position[0] && point.position[1]) {
      this.setPoint(point);
    }

    this.setMapStyles(this.map);

    // onLoad
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  };

  setMapStyles = map => {
    System.import('data/mapStyles.js')
      .then(styles => {
        map.setOptions({styles: styles.default})
      })
  };
  // add just one marker
  addMarker = (mark, isTemp) => {
    if (!this.markers)
      this.markers = [];

    if (
      !mark || !mark.position ||
      !mark.position[0] || !mark.position[1]
    )
      return null

    const marker = this.createMarker(mark);

    marker.isTemp = isTemp;

    this.markers.push(marker);
  };
  // add markers from array
  addMarkers = (data) => loop(data, this.addMarker);
  // unmount all react markers and
  // remove them
  deleteMarkers = () => {
    if (!this.markers) return;
    loop(this.markers, (marker) => {
      unmount(marker.block);
      marker.setMap(null);
    });
    this.markers = [];
  };

  // set just one point
  // and zoom him
  setPoint = point => {
    if (!point.position) return;

    this.zoomPoint(point);
    this.deleteMarkers();
    this.addMarker(point, true);
  };
  // zoom to the point
  zoomPoint = ({position: [lat, lng], zoom}) => {
    const { center } = this.options;
    const _center = {
      lat: +lat || center.lat,
      lng: +lng || center.lng
    };

    this.map.setCenter(_center);
    this.map.setZoom(zoom || config.onSetPointZoom);
  };

  // remove old markers and create new
  createNewMarkers = (data) => {
    const { options: {center, zoom}, points } = config;
    this.deleteMarkers();
    this.addMarkers(data || points);
    this.zoomPoint({position: center, zoom})
  };

  setDirection = props => {
    const { point, direction } = props || this.props;

    if (!point || !direction || !point.position || !direction.position)
      return null;

    const [lat, lng] = point.position;
    const [_lat, _lng] = direction.position;

    const origin = new google.maps.LatLng(lat, lng);
    const destination = new google.maps.LatLng(_lat, _lng);

    const request = {
      origin, destination,
      travelMode: google.maps.TravelMode[direction.method || 'WALKING'],
      unitSystem: google.maps.UnitSystem.METRIC,
      optimizeWaypoints: true,
      provideRouteAlternatives: true,
      avoidHighways: true,
      avoidTolls: true
    };
    this.directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);

        const routes = result.routes;
        const leg = routes[0].legs;
        const length = leg[0].distance.text;
        const duration = leg[0].duration.text;

        console.log(window.res = {
          routes,
          leg, length,
          duration
        })
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) return;

    const { props } = this;
    const { point, points, direction } = nextProps;
    const _point = props.point || {};
    const _points = props.points || {};
    const _direction = props.direction || {};
    const hasNoPoints = isEmpty(points);

    if (hasNoPoints && point.position && !shallowEqual(point.position, _point.position)) {
      console.log('set point...');
      return this.setPoint(point);
    }

    if (direction && !shallowEqual(direction.position, _direction.position)) {
      console.log('set direction...');
      return this.setDirection(nextProps);
    }

    if (nextProps.points && !shallowEqual(points, _points)) {
      console.log('CREATE NEW MARKERS', points);
      this.createNewMarkers(points);
    }
  }

  componentDidMount() {
    this.loadLibrary();
  }

  componentWillUnmount() {
    this.deleteMarkers();
    this.isUnmounted = true;
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
