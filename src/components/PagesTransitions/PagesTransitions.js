import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { classNames } from 'helpers'
import { Switch } from 'react-router-dom'
import s from './PagesTransitions.sass'


const mapStateToProps = ({device: {width, height}, dom: {update}}) => ({
  width, height,

  updateDom: block => update({
    name: 'content',
    block
  })
});

@inject(mapStateToProps) @observer
export default class PagesTransitions extends Component {
  isFirst = true;
  dom = {};
  dur = .7;
  ease = Cubic.easeOut;

  componentWillReceiveProps({currentPage}) {
    const props = this.props;

    if (props.currentPage !== 0) {
      this.isFirst = false;
    }

    if (currentPage !== props.currentPage) {
      this.update(currentPage, props.currentPage);
    }
  }
  componentDidMount() {
    this.animation();
  }

  update(prev, next) {
    if (!this.isFirst) {
      // we will add direction support in future
      const direction = prev < next ? 'next' : 'prev';

      this.animation(direction);
    }
  }

  animation() {
    if (!this.wrapper) return;
    const { dur, ease } = this;

    document.body.scrollTop = 0;

    TweenMax.fromTo(this.wrapper, dur, {
      opacity: 0,
      //y: 200
    }, {
      opacity: 1,
      //y: 0,
      ease
    })
  }

  getRef = b => {
    this.wrapper = b;
    this.props.updateDom(b);
  };

  render() {
    const { className, children } = this.props;

    return (
      <div className={classNames(s.wrapper, className)} ref={this.getRef}>
        {children}
      </div>
    )
  }
}

