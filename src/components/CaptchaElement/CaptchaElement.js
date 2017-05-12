import React from 'react'
import { captchaApiKey } from 'config'

const id = 'captcha-element';
const captchaCallbackName = 'captchaInitCallback';
const callbackName = 'captchaCallback';
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
  if (window[callbackStorage]) {
    return window[callbackStorage].push(cb)
  }

  return window[callbackStorage] = [cb];
};
window[callbackName] = function captchaCallback() {
  const fns = window[callbackStorage] || [];

  fns.forEach(item => {
    if (typeof item === 'function') {
      item();
    }
  })

  return window[callbackStorage] = [];
};
const callInitiator = window[captchaCallbackName] = function captchaInitCallback() {
  if (typeof window[callbackName] === 'function') {
    window[callbackName]();
  }
  console.log('captcha callback was called!');
};

export default CaptchaElement;

