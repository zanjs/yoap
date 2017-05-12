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
  let block = document.querySelector(`#${CaptchaElement.id}`);

  block.style.display = 'none';
}

export default function captcha() {
  return new Promise((resolve, reject) => {
    if (window.location.href.indexOf('localhost') !== -1) {
      removeAttrs();
      return resolve();
    }

    subscribe(
      () => {
        const cb = () => {
          removeAttrs();
          return resolve();
        };

        if (grecaptcha.getResponse().length !== 0) {
          return cb();
        }

        addAttrs(cb).then(() => {
          grecaptcha.execute();
        });
      },

      checkCaptchaLoaded
    )
  })
}
