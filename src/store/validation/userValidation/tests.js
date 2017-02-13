/**
 * User validation.
 *
 * @module userValidation
 */
import { userValidation as messages } from 'config'
import { isEmpty } from 'helpers'


/**
* Email validation.
*
* @param {string} string
* @return {Object}
*/
export const validateEmail = (string = '') => {
  if (isEmpty(string)) {
    return {isError: true, message: messages.email.empty};
  }

  if (string.indexOf('@') !== -1 && string.indexOf('.') !== -1) {
    return {isError: false, message: messages.email.success};
  }

  return {isError: true, message: messages.email.wrong};
};

/**
 * Password validation.
 *
 * @param {string} string
 * @return {Object}
 */
export const validatePassword = (string = '') => {
  if (isEmpty(string)) {
    return {isError: true, message: messages.password.empty};
  }

  if (string.length >= 8) {
    return {isError: false, message: messages.password.success};
  }

  if (string.length >= 4) {
    return {isError: false, isNormal: true, message: messages.password.normal};
  }

  return {isError: true, message: messages.password.wrong};
};

/**
 * Name validation.
 *
 * @param {string} string
 * @return {Object}
 */
export const validateName = (string = '') => {
  if (isEmpty(string)) {
    return {isError: true, message: messages.name.empty};
  }

  if (string.length <= 2 && string.length >= 1) {
    return {
      isError: false, isNormal: true,
      message: messages.name.normal.replace('3', string.length)
    };
  }

  if (string.length >= 3) {
    return {isError: false, message: messages.name.success};
  }

  return {isError: true, message: messages.name.wrong};
};

/**
 * Test phone number validation.
 *
 * @param {string|number} phone
 * @return {boolean}
 */
const testPhone = (phone) => {
  const reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const exec = reg.exec(phone);
  const test = reg.test(phone);
  let isNull = false;

  if (!exec || exec.length !== 4) return false;

  exec.forEach(item => {
    if (item == null) isNull = true;
  });

  return test && !isNull
};

/**
 * Phone validation.
 *
 * @param {string} string
 * @return {Object}
 */
export const validatePhone = (string = '') => {
  const isMatched = testPhone(string);

  if (isEmpty(string)) {
    return {isError: true, message: messages.phone.empty};
  }

  if (isMatched) {
    return {isError: false, message: messages.phone.success};
  }

  if (isNaN(parseInt(string))) {
    return {isError: true, message: messages.phone.NaN};
  }

  if (string.length < 7) {
    return {isError: true, message: messages.phone.short};
  }

  return {isError: true, message: messages.phone.wrong};
};

/**
 * Message validation.
 *
 * @param {string} string
 * @return {Object}
 */
export const validateMessage = (string = '') => {
  if (isEmpty(string)) {
    return {isError: false, isNormal: true, message: messages.message.empty};
  }

  return {isError: false, message: messages.message.success};
};


/**
 * Entry point of validation.
 *
 * @param {string} name
 * @param {string|number} value
 * @return {Object}
 */
export const isValid = (name, value) => {
  switch(name) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'name':
      return validateName(value);
    case 'phone':
      return validatePhone(value);
    case 'message':
      return validateMessage(value);
    default:
      return {}
  }
};
