import React, { Component, PropTypes } from 'react'
import {
  render as mount,
  unmountComponentAtNode as unmount
} from 'react-dom'
import { Svg, MapMarker, RouterStoreProvider } from 'components'
import { loop, classNames, loadScript, shallowEqual } from 'helpers'
import { map as config } from 'config'
import s from './Map.sass'

import locationIcon from 'icons/ui/location.svg'
import bulletIconPng from 'images/ui/bullet.png'
//import locationIconPng from 'icons/ui/location.png'


export default class Map extends Component {
  static defaultProps = {currentPoint: {position: []}};
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

    wrapper.className = s.marker;
    const ReactElement = mount(
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

    const infowindow = new InfoWindow({
      content: wrapper
    });

    event.addListener(marker, 'click', () => {
      infowindow.open(this.map, marker);
    });

    event.addListener(infowindow, 'domready', () => {
      marker.ReactElement.forceUpdate();
    });

    marker.block = wrapper;
    marker.ReactElement = ReactElement;

    return marker;
  };
  // render marker by react
  renderMarker = data => {
    return (
      <RouterStoreProvider router={this.context.router}>
        <MapMarker {...data.props}/>
      </RouterStoreProvider>
    )
  };
  // get map options
  getOptions = () => {
    const { center: [lat, lng], ...rest } = config.options;

    this.options = {
      center: { lat, lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      ...rest,
      ...this.props.options,
    };

    return this.options;
  };

  // initialize map
  initMap = () => {
    const { point, points } = this.props;
    this.markers = [];
    this.map = new window.google.maps.Map(this.mapBlock, this.getOptions());

    this.transitLayer = new window.google.maps.TransitLayer();
    this.transitLayer.setMap(this.map);


    if (points) {
      this.addMarkers(points);
    }

    if (point) {
      this.setPoint(point);
    }

    // onLoad
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  };

  // add just one marker
  addMarker = (mark, isTemp) => {
    if (!this.markers)
      this.markers = [];

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
    this.map.setCenter({lat, lng});
    this.map.setZoom(zoom || config.onSetPointZoom);
  };

  // remove old markers and create new
  createNewMarkers = (data) => {
    const { options: {center, zoom}, points } = config;
    this.deleteMarkers();
    this.addMarkers(data || points);
    this.zoomPoint({position: center, zoom})
  };

  componentWillReceiveProps(nextProps) {
    if (!this.state.isLoaded) return;

    const { props } = this;
    const { point, points } = nextProps;

    if (!shallowEqual(point, props.point)) {
      return this.setPoint(point);
    }

    if (nextProps.points && !shallowEqual(points, props.points)) {
      console.log('create new markers from points');
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
