import React, { Component } from 'react'
import { BaseFilterItem, SubwayMap } from 'components'
import s from './BaseFilterSubway.sass'
import subwayIcon from 'icons/ui/subway.svg'
import mapImage from 'icons/subway/spb.svg'

export default class BaseFilterSubway extends Component {
  state = {isOpen: false};


  clickHandler = () =>
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));

  mapClickHandler = ({target}) => {

  };

  render() {
    const { isOpen } = this.state;

    return (
      <BaseFilterItem onClick={this.clickHandler} title="Ближайшее метро" icon={subwayIcon}>
        Звенигородская
        {isOpen && <SubwayMap src={mapImage}/>}
      </BaseFilterItem>
    )
  }
}

