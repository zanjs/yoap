import React from 'react'
import { captchaApiKey } from 'config'

const id = 'captcha-element';
const styles = {
  display: 'none'
}

const CaptchaElement = () => (
  <div id={id} className="g-recaptcha"
       data-size="invisible"
       data-sitekey={captchaApiKey}
       style={styles} />
)

CaptchaElement.id = id;

export default CaptchaElement;

