import React, { Component } from 'react'
import { classNames } from 'helpers'
import s from './FlexGrid.sass'

const getClass = (_pref, cl) => {
  return s[_pref + '--' + cl];
};

const getValue = (value, _pref, def) => {
  if (!value) {
    return getClass(_pref, def)
  }

  return getClass(_pref, value);
};

const FlexGrid = ({direction, justify, align, wrap, className, children, getRef, tag, ...rest}) => {
  const _className = classNames(
    s.flex,
    getValue(direction, 'direction', 'row'),
    getValue(justify, 'justify', 'space-between'),
    getValue(align, 'align', 'stretch'),
    getValue(wrap, 'wrap', 'false'),

    className
  );
  const Element = tag ? tag : 'div';


  return (
    <Element ref={getRef} className={_className} {...rest}>
      {children}
    </Element>
  )
};

export default FlexGrid;
