import React, { Component } from 'react'

const id = 'captcha-element';
const styles = {
  display: 'none'
}

const CaptchaElement = () => (
  <div id={id} data-size="invisible" style={styles} />
)

CaptchaElement.id = id;

export default CaptchaElement;

