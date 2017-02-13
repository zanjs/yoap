import { isEmpty, keys } from 'helpers'
import { objectTypes } from 'constants'

const messages = {
  type: {
    empty: 'Тип объекта не может быть пустым!',
    wrong: 'Неправильный тип объекта: %',
    success: ''
  },
  size: {
    emptyField: 'Поле % не может быть нулем или пустым.',
    empty: 'Вы не определили размер вашего объекта.',
    success: ''
  },
  location: {
    empty: 'Адрес не может быть пустым!',
    success: ''
  }
};

//=============================================================================== ### TYPE VALIDATION ###
export const validateType = ({id}) => {
  if (isEmpty(id)) {
    return {isError: true, message: messages.type.empty};
  }

  const isExist = JSON.stringify(objectTypes).indexOf(id) === -1;

  if (typeof id !== 'string' || isExist) {
    return {
      isError: true,
      message: messages.type.wrong.replace('%', id)
    };
  }

  return {isError: false, message: messages.type.success};
};

//=============================================================================== ### SIZE VALIDATION ###
export const validateSize = data => {
  if (typeof data !== 'object' || isEmpty(data)) {
    return {isError: true, message: messages.type.empty};
  }

  // check fields on error
  let isError = [];
  const formattedData = keys(data, (item, prop, result) => {
    let newItem = parseInt(item, 10);

    switch (prop) {
      case 'rooms':
      case 'totalSquares':
      case 'livingSquares':
        if (newItem <= 0) {
          isError.push(messages.size.emptyField.replace('%', prop));
        }
        break;
    }

    return newItem;
  });

  if (isError.length > 0) {
    return {
      isError: true,
      message: isError.replace(',', '\n')
    }
  }

  return {isError: false, message: messages.size.success};
};

//=============================================================================== ### ADDRESS VALIDATION ###
export const validateLocation = ({address}) => {
  if (isEmpty(address)) {
    return {isError: true, message: messages.location.empty};
  }
  // TODO: Extend address validation

  return {isError: false, message: messages.location.success};
};

//=============================================================================== ### ADDRESS VALIDATION ###
export const validateFacilities = (string = '') => {
  if (isEmpty(string)) {
    return {isError: true, message: messages.address.empty};
  }
  // TODO: Extend address validation

  return {isError: false, message: messages.address.success};
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
