import React, { Component } from 'react'
import { Svg, FlexGrid } from 'components'
import { classNames } from 'helpers'
import s from './StarsRating.sass'

import starIcon from 'icons/ui/star.svg'

export default class StarsRating extends Component {
  static defaultProps = {
    value: 0
  };

  dur = .3; ease = Cubic.easeOut;
  activeColor = this.props.activeColor || '#FF5388';
  inactiveColor = this.props.inactiveColor || '#dddddd';
  blocks = [];
  stars = [1,2,3,4,5];
  rating = 0;

  componentDidMount() {
    this.setActive(this.props.value);
  }

  setActive = value => {
    const {
      dur, ease,
      activeColor, inactiveColor
    } = this;
    const index = value - 1;
    this.currentValue = value;
    this.blocks.forEach((block, key) => {
      const isActive = key <= index;

      TweenMax.to(block, dur, {
        fill: isActive ? activeColor : inactiveColor,
        ease
      })
    })
  };

  getRating = block => {
    if (!block)
      return null;

    const rating = parseInt(block.getAttribute('data-rating'), 10);

    if (isNaN(rating) || rating == null)
      return null;

    return rating;
  }

  mouseEnterHandler = ({target}) => {
    const rating = this.getRating(target);

    if (rating == null)
      return;

    this.setActive(rating);
  };
  mouseLeaveHandler = () => {
    this.setActive(this.props.value);
  };
  clickHandler = () => {
    const rating = this.currentValue;
    if (rating === this.props.value) {
      return null;
    }

    if (this.props.onChange) {
      this.props.onChange(rating);
    }
  };

  render() {
    const {
      props: { className, itemClassName, tag, edit },
      stars, clickHandler, mouseEnterHandler, mouseLeaveHandler
    } = this;
    const _itemClassName = classNames(
      s.item, edit && s.item_edit,

      itemClassName
    );

    return (
      <FlexGrid tag={tag} justify="start" align="center"
                onMouseLeave={edit && mouseLeaveHandler}
                className={classNames(edit && s.edit, className)}>
        {stars.map((star, index) => (
          <Svg getRef={b => this.blocks[index] = b}
               data-rating={star} key={index}
               onMouseEnter={edit && mouseEnterHandler}
               onClick={edit && clickHandler}
               src={starIcon} className={_itemClassName}
               tag="span"/>
        ))}
      </FlexGrid>
    )
  }
}

