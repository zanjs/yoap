import React, { Component } from 'react'
import pinchZoom from 'pinch-zoom'
import { inject, observer } from 'mobx-react'
import { NavContainer } from 'containers'
import { Modal, Svg, Button } from 'components'
import { classNames, bindWheel } from 'helpers'
import s from './SubwayMap.sass'


const mapStateToProps = ({device: {support}}) => ({
  touchable: support.touch
});

@inject(mapStateToProps) @observer
export default class SubwayMap extends Component {
  state = {selected: []};

  itemClassName = 'subway_map__item';
  activeItemClassName = 'subway_map__item--active';
  dur = .3; ease = Cubic.easeOut;
  min = 1; max = 3; step = .5;

  scale = 1;
  startScale = 1;

  componentDidMount() {
    setTimeout(this.initMap, 300);
  }

  initMap = () => {
    this.touchInit();
    this.dragInit();
    this.wheelInit();
    this.applyStyles();
  };

  applyClasses = () => {
    const { itemClassName } = this;
    const gElements = [...this.map.querySelector('svg').querySelectorAll('g')];

    gElements.forEach(item => {
      const attr = item.getAttribute('data:subway-station');

      if (attr && JSON.parse(attr)) {
        item.setAttribute('class', itemClassName);
      }
    })
  };
  applyStyles = () => {
    const id = 'subway-map-styles';
    this.applyClasses();
    if (document.querySelector(`#${id}`))
      return;

    const { itemClassName, activeItemClassName } = this;
    const style = document.createElement('style');
    style.setAttribute('id', id);
    style.innerHTML = `
      g.${itemClassName} {
        pointer-events: bounding-box;
        transition: opacity .15s ease-in-out;
        cursor: pointer;
      }
      g.${itemClassName}:hover {
        opacity: .6;
      }
      g.${activeItemClassName} * {
        fill: inherit !important;
      }
      g.${activeItemClassName} {
        opacity: 1 !important;
        fill: #4A90E2;
      }
    `;

    document.head.appendChild(style);
  };

  dragInit = () => {
    if (this.props.touchable)
      return;

    Draggable.create(this.map, {
      type:"x,y",
      edgeResistance:0.65,
      bounds: this.wrapper,
      throwProps:true
    });

    TweenMax.set(this.map, {
      y: '65%'
    })
  };
  touchInit = () => {
    this.pinchZoom = pinchZoom(this.map, {
      draggable: this.props.touchable,
      maxScale: this.max
    })
  };
  zoomScale = (y, prev, min, max, step) => {
    if (y < 0) {
      if (prev <= min) {
        return min;
      }

      return prev - step;
    }

    if (prev >= max) {
      return max;
    }

    return prev + step;
  };

  zoom = y => {
    const {
      dur, ease, step,
      min, max
    } = this;

    const scale = this.scale =
      this.zoomScale(y, this.scale, min, max, step);

    TweenMax.to(this.map, dur, {
      scale,
      ease
    });
  };

  wheelInit = () => {
    bindWheel.on(this.wrapper, e => {
      const delta = e.deltaY || e.detail || e.wheelDelta;
      this.zoom(delta)
    })
  };

  getMapRef = b => this.map = b;
  getWrapperRef = b => this.wrapper = b;

  mapClickHandler = ({target}) => {
    const { itemClassName } = this;

    let block = target;
    const tagName = block.tagName.toLowerCase();

    if (tagName !== 'g') {
      block = block.closest(`.${itemClassName}`)
    }


    const className = block.getAttribute('class') || '';
    const id = block.getAttribute('id');

    if (className.indexOf(itemClassName) !== -1) {
      console.log(id);
      this.triggerStation(id, block);
    }
  };

  triggerStation = (id, node) => {
    const {
      itemClassName, activeItemClassName,
      state: {selected}
    } = this;
    const index = selected.findIndex(
      item => item === id
    );

    if (index >= 0) {
      node.setAttribute('class', itemClassName);

      return this.setState({
        selected: selected.filter(item => item !== id)
      })
    }

    node.setAttribute(
      'class',
      classNames(itemClassName, activeItemClassName)
    );

    return this.setState({
      selected: [
        ...selected,
        id
      ]
    })
  };

  render() {
    const {
      props: {src, onClose},
      getMapRef,
      getWrapperRef,
      mapClickHandler
    } = this;

    return (
      <Modal getRef={getWrapperRef}
             wrapperClassName={s.wrapper}
             className={s.modal}>
        <NavContainer>
          <Button type="light" onClick={onClose}
                  className={s.button} rounded
                  smallPadding>
            Готово
          </Button>
        </NavContainer>
        <Svg getRef={getMapRef}
             onClick={mapClickHandler}
             className={s.map} src={src}/>
      </Modal>
    )
  }
}

