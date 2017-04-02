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

  isLink = (tag, element, rest) => {
    const taqCheck = typeof tag === 'string' || typeof  element === 'string';

    return !(taqCheck
    && (tag !== 'a' || element !== 'a')
    && (rest.href || rest.to))
  };

  render() {
    let { className, children, type, tag, element, ...rest } = this.props;

    if (!this.isLink(tag, element, rest)) {
      rest = {...rest};
      delete rest.href;
      delete rest.to;
    }

    return (
        <Content tag={tag || RouterLink}
              className={classNames(s.link, this.getType(type), className)}
              {...rest}>
            {children}
        </Content>
    )
  }
}
