import React, { Component } from 'react'
import { observer, inject } from "mobx-react";
import { canvasRGBA } from 'stackblur-canvas'
import { classNames, sizes as size } from 'helpers'
import s from './Image.sass'

const mapStateToProps = ({device: {width}}) => ({
  width
});

const BLUR_RADIUS = 30;

import { image as image_config } from '../../config'


@inject(mapStateToProps) @observer
export default class Image extends Component {
  dur = image_config.duration; ease = image_config.ease();
  delay = image_config.delay;

  isLoaded = false;
  state = {isLoading: true, isPreviewShowed: false};

  getPrevDeviceSize = (sizes, currentDevice) => {
    let prevDevice = size.getPrevDeviceBreakpoint(currentDevice);

    if (sizes[prevDevice.name]) {
      return sizes[prevDevice.name];
    }

    let src;

    sizes.forEach(item => {
      if (src) return;

      prevDevice = size.getPrevDeviceBreakpoint(prevDevice);

      if (sizes[prevDevice.name]) {
        src = sizes[prevDevice.name];
      }
    });


    return src;
  };
  getSrc = (sizes) => {
    // get current device params
    let currentDevice = size.getDeviceBreakpoint(this.props.width);


    if (sizes[currentDevice.name]) {
      return sizes[currentDevice.name];
    }

    // check other resolutions if we have.
    return this.getPrevDeviceSize(sizes, currentDevice);
  };

  onLoad = () => {
    this.isLoaded = true;
    this.setState({isLoading: false}, this.hidePreview)
  };

  onLoadWithPreview = () => {
    this.setState({isLoading: false});
  };

  hidePreview = () => {
    if (!this.state.isPreviewShowed) return;

    const { dur, ease } = this;
    TweenMax.fromTo(this.previewCanvas, dur, {
      opacity: 1
    }, {
      opacity: 0,
      ease,
      onComplete: () => {
        this.setState({isPreviewShowed: false})
      }
    })
  };

  drawPreview = () => {
    //if (!this.state.isPreviewShowed) return;
    const image = this.previewImage;//new Image();
    const canvas = this.previewCanvas;
    const canvasContext = this.previewCanvas.getContext('2d');

    const w = canvas.width;
    const h = canvas.height;
    canvasContext.drawImage(image, 0, 0, w, h);
    canvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
  };

  isPreviewNeeded = () => {
    if (this.props.withPreview) return null;

    setTimeout(() => {
      if (!this.isLoaded) {
        this.setState({isPreviewShowed: true})
      }
    }, this.delay * 1000);
  };

  componentWillReceiveProps(nextProps) {
    const { props } = this;

    if (props.src !== nextProps.src) {
      this.needUpdate = true;
    }
  }

  componentDidMount() {
    this.isPreviewNeeded();
  }

  componentDidUpdate() {
    if (this.needUpdate) {
      this.needUpdate = false;
      this.isLoaded = false;
      this.setState({
        isPreviewShowed: false,
        isLoading: true
      }, () => {
        this.isPreviewNeeded();
      });
    }
  }


  render() {
    let { src } = this.props;
    const {
      withLoading, withPreview, className, alt,
      fill, getRef, previewClassName, style = {}
    } = this.props;
    const { isLoading, isPreviewShowed } = this.state;

    // get preview src
    let previewSrc = this.props.preview || this.props.src.preview;

    // calculating responsive image from set
    if (typeof src !== 'string') {
      src = this.getSrc(src);
    }

    if (!src) {
      return null;
    }

    if (!withLoading) {
      return (
        <img src={src} className={classNames(s.image, className)} alt={alt} ref={getRef} style={style}/>
      )
    }

    if (withPreview) {
      const originalImageStyles = {
        display: isLoading ? 'none' : 'block',
        ...style
      };
      const previewImageStyles = {
        display: isLoading ? 'block' : 'none'
      };

      return (
        <figure className={classNames(s.load, className, s.wrapper)}>
          {isLoading &&
          <img src={previewSrc}
               ref={b => this.previewImage = b}
               className={classNames(s.load__image, className)} />}

          {/* original image */}
          <img src={src} alt={alt}
               className={classNames(s.load__image, className)}
               style={originalImageStyles} onLoad={this.onLoadWithPreview}
               ref={getRef}
          />
        </figure>
      )
    }

    const originalImageStyles = {
      opacity: isLoading ? 0 : 1,
      ...style
    };

    return (
      <figure className={classNames(s.load, className, s.wrapper)}>
        {/* everything for preload */}
        {isPreviewShowed && <canvas className={classNames(s.preview, previewClassName)} ref={b => this.previewCanvas = b}/>}
        {isLoading && <img src={previewSrc} ref={b => this.previewImage = b} className={s.load__preview} />}
        {isPreviewShowed && <img src={previewSrc} className={s.load__preview}
                                 ref={b => this.previewImage = b} onLoad={this.drawPreview}/>}

        {/* original image */}
        <img src={src} alt={alt}
             className={classNames(s.load__image, className)}
             style={originalImageStyles} onLoad={this.onLoad}
             ref={getRef}
        />
        {/*<Preloader isLoading={isLoading} style={{fill}}/>*/}
      </figure>
    )
  }
}

