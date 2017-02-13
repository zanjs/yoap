/**
 * Item validation.
 *
 * @module itemValidation
 */
import { isEmpty, keys } from 'helpers'
import {
  objectTypes, facilitiesTypes,
  amenitiesTypes, rulesTypes,
  termTypes
} from 'constants'

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
  },
  floors: {
    empty: 'Этажность необходимо заполнить',
    emptyAmount: 'Вы не ввели общее количество этажей.',
    wrong: '',
    success: ''
  },

  facilities: {
    empty: 'Удобства не могут быть пустыми!',
    wrong: 'Неправильный(-е) тип(-ы) удобств(-а): %',
    success: ''
  },
  rules: {
    empty: 'Правила дома не могут быть пустыми!',
    wrong: 'Неправильный(-е) тип(-ы) правил(-а): %',
    success: ''
  },
  amenities: {
    empty: 'Помещения не могут быть пустыми!',
    wrong: 'Неправильный(-е) тип(-ы) помещения(-й): %',
    success: ''
  },
  term: {
    empty: 'Срок сдачи не может быть пустыми!',
    wrong: 'Неправильный тип срока: %',
    success: ''
  }
};

/**
* Item type validation.
*
* @param {string|number} id
* @return {Object}
*/
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

/**
 * Item size validation.
 *
 * @param {Object} data
 * @return {Object}
 */
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
        if (newItem <= 0) {
          isError.push(messages.size.emptyField.replace('%', prop));
        }
        break;
      case 'squares':
        let { living, total } = item;
        living = parseInt(living, 10);
        total = parseInt(total, 10);

        if (total <= 0 || living <= 0) {
          isError.push(messages.size.emptyField.replace('%', prop));
        }

        newItem = {total, living};

        break;
    }

    return newItem;
  });

  if (isError.length > 0) {
    return {
      isError: true,
      message: isError.toString().replace(',', '\n')
    }
  }

  return {isError: false, message: messages.size.success};
};

/**
 * Location validation.
 *
 * @param {Object} address
 * @return {Object}
 */
export const validateLocation = ({address}) => {
  if (isEmpty(address)) {
    return {isError: true, message: messages.location.empty};
  }
  // TODO: Extend address validation

  return {isError: false, message: messages.location.success};
};

/**
 * Facilities validation.
 *
 * @param {Array} data
 * @return {Object}
 */
export const validateFacilities = (data) => {
  if (isEmpty(data)) {
    return {isError: true, message: messages.facilities.empty};
  }

  const errors = [];
  const stringifiedTypes = JSON.stringify(facilitiesTypes);
  const checkExist = string => stringifiedTypes.indexOf(string) !== -1;

  data.forEach(props => {
    const id = props && props.id || props;
    const types = props.types;
    const isExist = checkExist(id);

    if (!isExist) {
      errors.push(id);
    }

    types && types.length && types.forEach(item => {
      const isExist = checkExist(item.id || item);

      if (!isExist) {
        errors.push(id);
      }
    })
  });

  if (errors.length) {
    return {
      isError: true,
      message: messages.facilities.wrong.replace('%',
        errors.toString()
      )
    };
  }

  return {isError: false, message: messages.facilities.success};
};

/**
 * Floors validation.
 *
 * @param {Array} data
 * @return {Object}
 */
export const validateFloors = data => {
  if (!data || !data.length) {
    return {isError: true, message: messages.floors.empty};
  }

  // check fields on error
  const [ current, amount ] = data;

  if (!amount) {
    return {
      isError: true,
      message: messages.floors.emptyAmount
    }
  }

  if (amount < current) {
    return {
      isError: true,
      message: messages.floors.wrong
    }
  }

  return {isError: false, message: messages.floors.success};
};

/**
 * Amenities validation.
 *
 * @param {Array} types
 * @return {Object}
 */
export const validateAmenities = ({types}) => {
  if (isEmpty(types)) {
    return {isError: true, message: messages.amenities.empty};
  }

  const errors = [];
  const stringifiedTypes = JSON.stringify(amenitiesTypes);
  const checkExist = string => stringifiedTypes.indexOf(string) !== -1;

  types.forEach(prop => {
    if (!checkExist(prop.id)) {
      errors.push(prop.name);
    }
  });

  if (errors.length) {
    return {
      isError: true,
      message: messages.amenities.wrong.replace('%',
        errors.toString()
      )
    };
  }

  return {isError: false, message: messages.amenities.success};
};

/**
 * Rules validation.
 *
 * @param {Array} types
 * @return {Object}
 */
export const validateRules = ({types}) => {
  if (isEmpty(types)) {
    return {isError: true, message: messages.rules.empty};
  }

  const errors = [];
  const stringifiedTypes = JSON.stringify(rulesTypes);
  const checkExist = string => stringifiedTypes.indexOf(string) !== -1;

  types.forEach(prop => {
    if (!checkExist(prop.id)) {
      errors.push(prop.name);
    }
  });

  if (errors.length) {
    return {
      isError: true,
      message: messages.rules.wrong.replace('%',
        errors.toString()
      )
    };
  }

  return {isError: false, message: messages.rules.success};
};

/**
 * Term validation.
 *
 * @param {string|number} id
 * @param {string} name
 * @return {Object}
 */
export const validateTerm = ({id, name}) => {
  if (isEmpty(id)) {
    return {isError: true, message: messages.term.empty};
  }

  const stringifiedTypes = JSON.stringify(termTypes);
  if (stringifiedTypes.indexOf(id) === -1) {
    return {
      isError: true,
      message: messages.term.wrong.replace('%',
        name
      )
    };
  }

  return {isError: false, message: messages.term.success};
};

// todo: validate: price, category, images, user, location
/**
 * Entry point validation.
 *
 * @param {string} name
 * @param {*} value
 * @return {Object}
 */
export const isValid = (name, value) => {
  switch(name) {
    case 'type':
      return validateType(value);
    case 'size':
      return validateSize(value);
    case 'location':
      return validateLocation(value);
    case 'facilities':
      return validateFacilities(value);
    case 'price':
      return validatePrice(value);
    case 'category':
      return validateCategory(value);
    case 'floors':
      return validateFloors(value);
    case 'amenities':
      return validateAmenities(value);
    case 'rules':
      return validateRules(value);
    case 'term':
      return validateTerm(value);
    case 'images':
      return validateImages(value);
    case 'user':
      return validateUser(value);
    default:
      return {}
  }
};
