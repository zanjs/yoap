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

  };

  render() {
    const { MapImage, isOpen } = this.state;

    return (
      <BaseFilterItem onClick={this.clickHandler} title="Ближайшее метро" icon={subwayIcon}>
        Звенигородская
        {isOpen && <SubwayMap src={MapImage}/>}
      </BaseFilterItem>
    )
  }
}

