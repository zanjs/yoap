import subscribe from './subscribe'
import randomNumber from './randomNumber'
import CaptchaElement from '../../components/CaptchaElement/CaptchaElement'
export const captchaApiKey = '6Le8IiEUAAAAAIeYkboQm250WHmO4EKhdXxXV4jz';
const checkCaptchaLoaded = () => !!window.grecaptcha && window.grecaptcha.render;

const getBlock = () => {
  return document.querySelector(`#${CaptchaElement.id}`);
};

const addAttrs = callbackName => {
  return new Promise((resolve) => {
    let block = getBlock();

    block.setAttribute('data-sitekey', captchaApiKey);
    block.setAttribute('data-callback', callbackName);

    console.log('added attrs', {
      'data-sitekey': captchaApiKey,
      'data-callback': callbackName
    });

    resolve();
  })
};

const removeAttrs = () => {
  let block = getBlock();

  block.setAttribute('data-sitekey', '');
  block.setAttribute('data-callback', '');
}

const getCallBackName = () => `captcha-cb-${parseInt(randomNumber(1000, 9999), 10)}`

export default function captcha() {
  return new Promise((resolve, reject) => {
    if (window.location.href.indexOf('localhost') !== -1) {
      return resolve();
    }

    subscribe(
      () => {
        const cbName = getCallBackName();

        window[cbName] = () => {
          window[cbName] = undefined;
          delete window[cbName];

          removeAttrs(); resolve();
        };

        addAttrs(cbName).then(grecaptcha.execute);
      },

      checkCaptchaLoaded
    )
  })
}
