import subscribe from './subscribe'
import CaptchaElement from '../../components/CaptchaElement/CaptchaElement'
const checkCaptchaLoaded = () => !!window.grecaptcha && window.grecaptcha.render;

const addAttrs = cb => {
  return new Promise((resolve) => {
    CaptchaElement.addCallback(cb);

    setAttrs('block');

    resolve();
  })
};

const setAttrs = (display = 'none') => {
  let block = document.querySelector(`#${CaptchaElement.id}`);

  block.style.display = display;
}

export default function captcha() {
  return new Promise((resolve, reject) => {
    if (window.location.href.indexOf('localhost') !== -1) {
      setAttrs();
      return resolve();
    }

    subscribe(
      () => {
        const cb = () => {
          setAttrs();
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
