import React, { Component } from 'react'
import { BaseFilterItem, SubwayMap } from 'components'
import s from './BaseFilterSubway.sass'
import subwayIcon from 'icons/ui/subway.svg'

export default class BaseFilterSubway extends Component {
  state = {MapImage: null, isOpen: false};

  componentDidMount() {
    this.setState({
      MapImage: require('icons/subway/spb.svg')
    })
  }

  clickHandler = () =>
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));

  mapClickHandler = ({target}) => {
    let element = target;
    const tagName = target.tagName.toLowerCase();

    switch (tagName) {
      case 'polygon':
      case 'path':
      case 'circle':
        element = target.parentElement;
    }

    console.log(element);
  };

  render() {
    const { MapImage, isOpen } = this.state;

    return (
      <BaseFilterItem onClick={this.clickHandler} title="Ближайшее метро" icon={subwayIcon}>
        Звенигородская
        <SubwayMap src={MapImage}/>
        {/*{isOpen && <SubwayMap src={MapImage}/>}*/}
      </BaseFilterItem>
    )
  }
}

