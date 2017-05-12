import subscribe from './subscribe'
import CaptchaElement from '../../components/CaptchaElement/CaptchaElement'
const checkCaptchaLoaded = () => !!window.grecaptcha && window.grecaptcha.render;

const addAttrs = cb => {
  return new Promise((resolve) => {
    CaptchaElement.addCallback(cb);

    resolve();
  })
};

const removeAttrs = () => {
  window[CaptchaElement.callbackName] = null;
}

export default function captcha() {
  return new Promise((resolve, reject) => {
    if (window.location.href.indexOf('localhost') !== -1) {
      return resolve();
    }

    subscribe(
      () => {
        const cb = () => {
          resolve();
          removeAttrs();
        };

        if (grecaptcha.getResponse().length !== 0) {
          return resolve();
        }

        addAttrs().then(() => {
          grecaptcha.execute();
        });
      },

      checkCaptchaLoaded
    )
  })
}
