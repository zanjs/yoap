import React, { Component } from 'react'


const Svg = ({src, tag, getRef, ...rest}) => {
  const Element = tag ? tag : 'div';

  return (
      <Element dangerouslySetInnerHTML={{__html: src}} {...rest} ref={getRef}/>
  )
};

export default Svg;
