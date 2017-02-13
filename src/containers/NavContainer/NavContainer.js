import React, { Component } from 'react'
import pages from 'pages'
import { Nav } from 'components'

const prepareLink = url => {
  if (url.indexOf(':') === -1) return url;

  return (url + '').split(':')[0].slice(0, -1)
};

const links = pages.map(page => ({
  to: prepareLink(page.path),
  value: page.value
}));

export default class NavContainer extends Component {
  render() {
    return (
      <Nav links={links}/>
    )
  }
}

