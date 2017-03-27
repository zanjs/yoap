import { render as mount, unmountComponentAtNode } from 'react-dom'
import loadScript from './loadScript'
import extend from './extend'
import { map as config } from 'config'
import bulletIconPng from 'images/ui/bullet.png'

export default class Map {
  isLoaded = false;
  _options;

  constructor({onLoad}) {
    this.load(onLoad);
  }

  get options() {
    if (this._options)
      return this._options;

    const { center: [lat, lng], ...rest } = config.options;

    return this._options = {
      center: { lat, lng },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      ...rest
    };
  }

  load = onLoad => {
    const { scriptId, link } = config;

    loadScript(link, () => {
      return this.onLoad(onLoad);
    }, scriptId);
  };

  createMap = (block, options) => {
    return this.map = new this.Map(block, {
      ...this.options,
      ...options
    });
  };
  createMarker = ({data, className, html, render, _icon = bulletIconPng, map = this.map}) => {
    const {
      Marker, InfoWindow, LatLng, event,
      Size, MarkerImage
    } = this;
    const wrapper = document.createElement('div');
    const size = 32;

    wrapper.className = className;

    if (html)
      wrapper.innerHTML = html;

    if (render) {
      wrapper.ReactElement = mount(render, wrapper);
    }

    const icon = new MarkerImage(
      _icon,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new Size(size, size)
    );

    const marker = new Marker({
      position: new LatLng(data.position[0], data.position[1]),
      title: data.title,
      icon, map
    });

    const infowindow = new InfoWindow({
      content: wrapper
    });



    event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
    });

    event.addListener(infowindow, 'domready', () => {
      if (render) {
        //unmountComponentAtNode(wrapper);
        const ReactElement = mount(render, wrapper);
        ReactElement.forceUpdate();
      }
    });

    marker.block = wrapper;

    return marker;
  };

  onLoad = cb => {
    this.isLoaded = true;
    extend(this, window.google.maps);

    // this.evemt.addListener(this.InfoWindow, 'domready', function() {
    //
    //   // Reference to the DIV which receives the contents of the infowindow using jQuery
    //   const iwOuter = document.querySelector('.gm-style-iw');
    //
    //   /* The DIV we want to change is above the .gm-style-iw DIV.
    //    * So, we use jQuery and create a iwBackground variable,
    //    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    //    */
    //   const iwBackground = iwOuter.prev();
    //
    //   // Remove the background shadow DIV
    //   iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    //
    //   // Remove the white background DIV
    //   iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    //
    // });

    if (cb) {
      cb();
    }
  }
}

window.MapClass = Map;
