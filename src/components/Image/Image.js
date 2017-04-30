import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  classNames, getDeviceBreakpoint,
  getPrevDeviceBreakpoint, shallowEqual
} from 'helpers'
import { image as config } from 'config'
import { apiOrigin as hostname } from 'constants/urls'
import s from './Image.sass'

const mapStateToProps = ({device: {width}}) => ({
  width
});

@inject(mapStateToProps) @observer
export default class Image extends Component {
  isFaded = false; isMount = false;
  dur = config.dur; ease = config.ease();

  state = {isLoaded: false, mainImageLoaded: false};
  getPrevDeviceSize = (sizes, currentDevice) => {
    let prevDevice = getPrevDeviceBreakpoint(currentDevice);

    if (sizes[prevDevice.name]) {
      return sizes[prevDevice.name];
    }

    let src;

    sizes.forEach(item => {
      if (src) return;

      prevDevice = getPrevDeviceBreakpoint(prevDevice);

      if (sizes[prevDevice.name]) {
        src = sizes[prevDevice.name];
      }
    });


    return src;
  };
  getSrc = (sizes) => {
    if (typeof sizes === 'string')
      return sizes;

    if (Object.keys(sizes).length <= 2) {
      return sizes.src;
    }

    // get current device params
    let currentDevice = getDeviceBreakpoint(this.props.width);


    if (sizes[currentDevice.name]) {
      return sizes[currentDevice.name];
    }

    // check other resolutions if we have.
    return this.getPrevDeviceSize(sizes, currentDevice);
  };

  componentWillMount() {
    this.isMount = true;
  }
  componentWillUnmount() {
    this.isMount = false;
  }

  componentWillReceiveProps({src, preview}) {
    if (preview !== preview || !shallowEqual(src, this.props.src)) {
      return this.setState({isLoaded: false, mainImageLoaded: false});
    }
  }

  componentDidUpdate() {
    if (!this.isFaded && this.state.mainImageLoaded) {
      this.showImage();
    }

    this.addEventListener();
  }

  componentDidMount() {
    this.addEventListener();
  }

  addEventListener = () => {
    this.image && this.image.addEventListener('load', this.onImageLoad);
  }

  showImage = () => {
    if (!this.isMount)
      return;
    this.isFaded = true;
    this.fadeInImage(() => {
      this.isMount && this.setState({
        isLoaded: true
      })
    })
  };
  fadeInImage = onComplete => {
    const preview = this.preview || (this.preview = document.querySelector(`.${s.preview}`))
    const image = this.image || (this.getRef(document.querySelector(`.${s.img}`)));

    if (!preview || !image)
      return null;

    const { dur, ease } = this;
    TweenMax.set(preview, {
      display: 'none'
    });
    TweenMax.fromTo(image, dur, {
      opacity: 0,
      display: 'block',
    }, {
      opacity: 1,
      ease,
      onComplete
    })
  };

  renderImage = props => (
    <img {...props} src={`${hostname}${props.src}`}/>
  );

  getPreviewRef = b => this.preview = b;
  getRef = b => {
    this.image = b;
    if (this.props.getRef) {
      this.props.getRef(b);
    }

    return b;
  }

  onImageLoad = () => {
    if (this.isMount && !this.state.mainImageLoaded) {
      this.isFaded = false;
      this.setState({mainImageLoaded: true});
    }
  }

  imageStyles = {display: 'none'}

  render() {
    const {
      className, withLoading,
      preview, src, alt, style
    } = this.props;
    const { getRef } = this;
    const { isLoaded } = this.state;
    const previewSrc =
      preview || src && src.preview || withLoading;

    if (!src)
      return null;

    if (!previewSrc) {
      return this.renderImage({
        src, className, ref: getRef, alt,
        style
      })
    }

    const _src = typeof src === 'string' ? src
      : src.full
        ? src.full : this.getSrc(src);

    if (isLoaded) {
      return this.renderImage({
        src: _src, className, ref: getRef, alt,
        style
      })
    }

    return (
      <figure className={s.wrapper}>
        {!isLoaded && <img className={classNames(s.preview, className)}
                           ref={this.getPreviewRef} style={style}
                           src={`${hostname}${previewSrc}`}/>}
        <img className={classNames(s.img, className)}
             src={`${hostname}${_src}`} style={this.imageStyles} ref={getRef}
             onLoad={this.onImageLoad}/>
      </figure>
    )
  }
}
