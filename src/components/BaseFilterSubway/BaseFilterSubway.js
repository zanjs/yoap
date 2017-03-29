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

  closeHandler = () =>
    this.setState({isOpen: false});
  openHandler = () =>
    this.setState({isOpen: true});

  mapClickHandler = ({target}) => {

  };

  render() {
    const {
      state: {isOpen},
      closeHandler,
      openHandler
    } = this;

    window.open = openHandler;

    return (
      <BaseFilterItem className={s.wrapper} onClick={openHandler}
                      title="Ближайшее метро" icon={subwayIcon}>
        Звенигородская
        {isOpen && <SubwayMap onClose={closeHandler} src={mapImage}/>}
      </BaseFilterItem>
    )
  }
}

