import React from 'react'
import { captchaApiKey } from 'config'

const id = 'captcha-element';
const captchaCallbackName = 'captchaInitCallback';
const callbackStorage = 'callbackStorage';
const styles = {
  display: 'block'
};

const CaptchaElement = () => (
  <div id={id} className="g-recaptcha"
       data-size="invisible" style={styles}
       data-callback={captchaCallbackName}
       data-sitekey={captchaApiKey}/>
)

CaptchaElement.id = id;
CaptchaElement.addCallback = (cb) => {
  if (window[callbackStorage] && window[callbackStorage].length != null) {
    return window[callbackStorage].push(cb)
  }

  return window[callbackStorage] = [cb];
};
function captchaCallback() {
  const fns = window[callbackStorage] || [null];

  return window[callbackStorage] = fns.filter(item => {
    if (!!item && typeof item === 'function') {
      item();
    }

    return false;
  })
};
const callInitiator = window[captchaCallbackName] = function captchaInitCallback() {
  captchaCallback();
};

export default CaptchaElement;

