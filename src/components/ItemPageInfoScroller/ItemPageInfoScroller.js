import React, { Component } from 'react'
import s from './ItemPageInfoScroller.sass'


export default class ItemPageInfoScroller extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.static}>

        </div>
        <div className={s.scroller} {...rest}>
          <div className={s.container}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

