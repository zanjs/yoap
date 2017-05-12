import subscribe from './subscribe'
import randomNumber from './randomNumber'
export const captchaApiKey = '6Le8IiEUAAAAAIeYkboQm250WHmO4EKhdXxXV4jz';
const checkCaptchaLoaded = () => !!window.grecaptcha && window.grecaptcha.render;

const getBlock = () => {
  let block = document.querySelector('button[type="submit"]')

  if (block) {
    return block;
  }

  block = document.querySelector('div');

  return block;
};

export default function captcha() {
  return new Promise((resolve, reject) => {
    if (window.location.href.indexOf('localhost') !== -1) {
      return resolve();
    }

    subscribe(
      () => {
        grecaptcha.render(getBlock(), {
          'sitekey' : captchaApiKey,
          'callback' : resolve,
        });
      },

      checkCaptchaLoaded
    )
  })
}
