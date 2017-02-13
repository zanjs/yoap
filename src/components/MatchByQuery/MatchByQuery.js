import React, { Component } from 'react'
import { Match } from 'react-router'
import { keys } from 'helpers'

export default class MatchByQuery extends Component {
  isMatched(query) {
    if (!query) {
      return null;
    }

    let isMatched = false;
    const { pattern } = this.props;
    let length = 0;
    let matchedLength = 0;

    keys(pattern, (item, prop) => {
      length++;
      if (item === query[prop]) {
        isMatched = pattern;
        matchedLength++;
      }
    });

    if (length !== matchedLength) {
      return false;
    }

    return isMatched
  }
  onMatch = (isMatched) => {
    const { onMatch, render, component } = this.props;

    if (typeof onMatch === 'function' && isMatched) {
      onMatch();
    }
  };

  _render = (matchProps) => {
    const Element = this.props.component;
    const Render = this.props.render;
    const props = this.props.props;

    const matched = this.isMatched(matchProps.location.query);

    if (!matched) return null;
    if (!Element) return <Render {...matchProps} {...props} matched={matched} ref={b => this.onMatch(matched)}/>;
    return <Element {...matchProps} {...props} matched={matched}  ref={b => this.onMatch(matched)} />
  };

  getPattern = () => {
    let pattern = '';

    keys(this.props.pattern, (item, prop) => {
      if (item === null) {
        return pattern += `&${prop}`
      }

      if (item === undefined) {
        return '';
      }

      return pattern += `&${prop}=${item}`;
    });

    return window.location.pathname + pattern.replace('&', '?');
  };

  render() {
    // TODO: fix bug on resize multiply rerendering.
    return (
      <Match pattern="" render={this._render}/>
      //<Match pattern="/" component={this._render}/>
    )
  }
}

