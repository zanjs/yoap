import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { classNames, getDeviceBreakpoint, getPrevDeviceBreakpoint } from 'helpers'
import { image as config } from 'config'
import s from './Image.sass'

const mapStateToProps = ({device: {width}}) => ({
  width
});

@inject(mapStateToProps) @observer
export default class Image extends Component {
  isFaded = false;
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
      return sizes.full;
    }

    console.log(sizes);

    // get current device params
    let currentDevice = getDeviceBreakpoint(this.props.width);


    if (sizes[currentDevice.name]) {
      return sizes[currentDevice.name];
    }

    // check other resolutions if we have.
    return this.getPrevDeviceSize(sizes, currentDevice);
  };

  componentDidUpdate() {
    if (!this.isFaded && this.state.mainImageLoaded) {
      this.showImage();
    }
  }

  showImage = () => {
    this.isFaded = true;
    this.fadeInImage(() => this.setState({
      isLoaded: true
    }))
  };
  fadeInImage = onComplete => {
    const { dur, ease } = this;
    TweenMax.set(this.preview, {
      display: 'none'
    });
    TweenMax.fromTo(this.image, dur, {
      opacity: 0,
      display: 'block',
    }, {
      opacity: 1,
      ease,
      onComplete
    })
  };

  renderImage = props => (
    <img {...props}/>
  );

  getPreviewRef = b => this.preview = b;
  getImageRef = b => this.image = b;

  render() {
    const {
      className, withLoading,
      preview,
      src, getRef, alt
    } = this.props;
    const { isLoaded } = this.state;
    const previewSrc =
      preview || src && src.preview || withLoading;

    if (!src)
      return null;

    if (!previewSrc) {
      return this.renderImage({
        src, className, ref: getRef, alt
      })
    }

    console.log(this.props.src);
    const _src = this.getSrc(this.props.src);

    if (isLoaded) {
      return this.renderImage({
        src: _src, className, ref: getRef, alt
      })
    }

    return (
      <figure className={s.wrapper}>
        {!isLoaded && <img className={classNames(s.preview, className)}
                           ref={this.getPreviewRef}
                           src={previewSrc} alt=""/>}
        <img className={classNames(s.img, className)}
             src={_src} style={{display: 'none'}} ref={this.getImageRef}
             onLoad={() => this.setState({mainImageLoaded: true})}/>
      </figure>
    )
  }
}
