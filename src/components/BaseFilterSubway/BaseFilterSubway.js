import React, { Component } from 'react'
import { BaseFilterItem, SubwayMap } from 'components'
import s from './BaseFilterSubway.sass'

import subwayIcon from 'icons/ui/subway.svg'

export default class BaseFilterSubway extends Component {
  state = {
    mapImage: null, isOpen: false
  };

  isMount = false;

  componentWillMount() {
    this.isMount = true;
    System.import('icons/subway/spb.svg')
      .then(mapImage => this.isMount && this.setState({
        mapImage
      }));
  }
  componentWillUnmount() {
    this.isMount = false;
  }

  closeHandler = e => {
    e.preventDefault();
    this.setState({isOpen: false});
    return false;
  };
  openHandler = e =>
    this.setState({isOpen: true});

  mapChangeHandler = selected => {
    if (this.props.onChange) {
      this.props.onChange(selected);
    }
  };

  getColor = data => {
    let max = 0;
    let color;
    let colors = {};

    // create unique array for each color
    data.forEach(({color}) => {
      if (colors[color]) {
        return colors[color].push(color);
      }

      return colors[color] = [color];
    });

    // find the biggest one
    for (let prop in colors) {
      const value = colors[prop];

      if (value.length > max) {
        color = prop;
        max = value.length;
      }
    }

    return color;
  };
  getProps = data => {
    if (!data || !data.length) {
      return {
        style: {fill: '#eaeaea'},
        children: 'Все станции'
      }
    }

    if (data.length === 1) {
      const { color, name } = data[0];
      return {
        style: {fill: color},
        children: name,
        selected: [data[0].id]
      }
    }

    return {
      style: {
        fill: this.getColor(data)
      },
      children: `Выбрано (${data.length})`,
      selected: data.map(item => item.id)
    }
  };

  render() {
    const {
      state: {isOpen, mapImage},
      props: {data},
      closeHandler,
      openHandler,
      mapChangeHandler
    } = this;

    const { style, children, selected } = this.getProps(data);

    return (
      <BaseFilterItem className={s.wrapper} onClick={openHandler}
                      title="Ближайшее метро" icon={subwayIcon}
                      style={style}>
        <span>{children}</span>
        {isOpen && <SubwayMap onChange={mapChangeHandler} selected={selected}
                              onClose={closeHandler} src={mapImage}/>}
      </BaseFilterItem>
    )
  }
}

