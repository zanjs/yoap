import React, { Component } from 'react'
import { Slider, Image } from 'components'
import { isEmpty, getDecimal } from 'helpers'
import s from './SliderImages.sass'

export default class SliderImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.parseData(this.props.data)
    };

    this.images = [];
    this.current = 0;

    this.dur = .3;
    this.ease = Cubic.easeOut;
  }
  componentWillReceiveProps({data}) {
    if (this.props.data !== data) {
      this.setState({
        data: this.parseData(data)
      })
    }
  }
  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resize = () => {
    this.move(.5);
  };
  resizeHandler = () => setTimeout(this.resize, 100);


  getImageRef = index => b => {
    this.images[index] = b;

    if (this.props.getRef) {
      this.props.getRef(b, index)
    }
  };
  getWrapperRef = b => this.wrapper = b;
  getCurrentSlide = index => {
    this.current = index;
  };


  parsePosition = (percent, block) => {
    const wrapperWidth = parseInt(block.parentElement.clientWidth, 10);
    const width = parseInt(block.clientWidth, 10);
    const max = width - wrapperWidth;
    const x = percent * max;


    return {
      max, x
    }
  };
  move = pos => {
    const block = this.images[this.current];

    if (!block)
      return null;

    let { max, x } = this.parsePosition(
      pos, block
    );

    if (x > max) {
      x = max;
    }
    if (x < 0) {
      x = 0;
    }

    if (this.position === x)
      return;

    this.position = x;

    TweenMax.to(block, .3, {
      x: `-${x}px`,
      y: `-50%`,
      left: 0,
      ease: Cubic.easeOut
    })
  };

  mouseMoveHandler = e => {
    const wrapperWidth = parseInt(this.wrapper.clientWidth, 10);
    const offset = parseInt(this.wrapper.offsetLeft, 10);
    const wrapperPercent = ((e.pageX - offset) / wrapperWidth);

    this.move(wrapperPercent);
  };

  parseData = data => data && data.map((item, key) => (
    item && <Image getRef={this.getImageRef(key)}
                   className={s.image} src={item}/>
  ));

  render() {
    const { data } = this.state;

    if (isEmpty(data)) {
      return null
    }

    return (
      <Slider getWrapperRef={this.getWrapperRef}
              getCurrentSlide={this.getCurrentSlide}
              onMouseMove={this.mouseMoveHandler}
              data={data}/>
    )
  }
}

