import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { ItemTile } from 'components'
import s from './MapMarker.sass'


export default class MapMarker extends Component {

  componentDidMount() {
    this.removeWrapperChunks();
    //console.log('MapMarker', 'did mount');
  }

  removeWrapperChunks = () => {
    if (!this.wrapper)
      return;

    const wrapper = this.wrapper.closest('.gm-style-iw');
    if (!wrapper)
      return;
    const { parentElement } = wrapper;

    parentElement.removeChild(
      parentElement.children[0]
    );

    wrapper.className += ` ${s.wrapper}`;
    wrapper.children[0].className = s.wrapper;
  };

  componentDidUpdate() {
    this.removeWrapperChunks();
    //console.log('MapMarker', 'did update');
  }


  getRef = b => {
    window.wrapper = this.wrapper = findDOMNode(b);
  };

  render() {
    //console.log('props', this.props);

    return (
      <ItemTile className={s.item}
                contentClassName={s.item__content}
                imageClassName={s.item__image}
                getRef={this.getRef} link="/"
                data={this.props.data}/>
    )
  }
}

