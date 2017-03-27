import React, { Component } from 'react'
import { Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './StarsRating.sass'

import starIcon from 'icons/ui/star.svg'

export default class StarsRating extends Component {
  static defaultProps = {
    value: 5
  };

  dur = .3; ease = Cubic.easeOut;
  activeColor = '#FF5388';
  inactiveColor = '#dddddd';
  blocks = [];

  componentDidMount() {
    this.setActive(this.props.value);
  }

  setActive = value => {
    const {
      dur, ease,
      activeColor, inactiveColor
    } = this;
    const index = value - 1;

    this.blocks.forEach((block, key) => {
      const isActive = key <= index;

      TweenMax.to(block, dur, {
        fill: isActive ? activeColor : inactiveColor,
        ease
      })
    })
  };

  render() {
    const {
      className, itemClassName, tag
    } = this.props;
    return (
      <FlexGrid tag={tag} justify="start" align="center"
                className={className}>
        <Svg getRef={b => this.blocks[0] = b}
             src={starIcon} className={classNames(s.item, itemClassName)} tag="span"/>
        <Svg getRef={b => this.blocks[1] = b}
             src={starIcon} className={classNames(s.item, itemClassName)} tag="span"/>
        <Svg getRef={b => this.blocks[2] = b}
             src={starIcon} className={classNames(s.item, itemClassName)} tag="span"/>
        <Svg getRef={b => this.blocks[3] = b}
             src={starIcon} className={classNames(s.item, itemClassName)} tag="span"/>
        <Svg getRef={b => this.blocks[4] = b}
             src={starIcon} className={classNames(s.item, itemClassName)} tag="span"/>
      </FlexGrid>
    )
  }
}

