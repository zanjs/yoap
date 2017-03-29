import React, { Component } from 'react'
import { BaseFilterItem, SubwayMap } from 'components'
import s from './BaseFilterSubway.sass'
import subwayIcon from 'icons/ui/subway.svg'

export default class BaseFilterSubway extends Component {
  state = {mapImage: null, isOpen: false};

  componentWillMount() {
    System.import('icons/subway/spb.svg')
      .then(mapImage => this.setState({
        mapImage
      }));
  }

  clickHandler = () =>
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));

  closeHandler = e => {
    e.preventDefault();
    this.setState({isOpen: false});
    return false;
  };
  openHandler = e =>
    this.setState({isOpen: true});

  mapClickHandler = ({target}) => {

  };

  render() {
    const {
      state: {isOpen, mapImage},
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

