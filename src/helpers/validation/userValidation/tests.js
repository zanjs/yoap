import { userValidation as messages } from 'config'
import { isEmpty } from 'helpers'


//=============================================================================== ### EMAIL VALIDATION ###
export const validateEmail = (string = '') => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (isEmpty(string)) {
    return {isError: true, message: messages.email.empty};
  }

  if (reg.test(string)) {
    return {isError: false, message: messages.email.success};
  }

  return {isError: true, message: messages.email.wrong};
};

//=============================================================================== ### PASSWORD VALIDATION ###
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

//=============================================================================== ### NAME VALIDATION ###
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

//=============================================================================== ### PHONE VALIDATION ###
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

//=============================================================================== ### MESSAGE VALIDATION ###
export const validateMessage = (string = '') => {
  if (isEmpty(string)) {
    return {isError: false, isNormal: true, message: messages.message.empty};
  }

  return {isError: false, message: messages.message.success};
};


//=============================================================================== ### ENTRY POINT OF VALIDATION ###
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
