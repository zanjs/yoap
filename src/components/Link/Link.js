import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { classNames } from 'helpers'
import { Content } from 'components'
import s from './Link.sass'


export default class Link extends Component {
  getType = (type) => {
    if (s[type]) {
      return s[type];
    }

    return null;
  };

  render() {
    const { className, children, type, tag, ...rest } = this.props;

    return (
        <Content tag={tag || RouterLink}
              className={classNames(s.link, this.getType(type), className)}
              {...rest}>
            {children}
        </Content>
    )
  }
}
