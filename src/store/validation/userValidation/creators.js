import { isValid } from './tests'

const covertToObject = (name, value, isChecked) => ({
  [name]: isChecked != null ? isChecked : value
});

export const createHandleChange = (context) => {
  return ({target, isChecked}) => {
    const state = context.state;
    const { name, value } = target;
    // check on errors
    if (!!state.errors[name]) {
      let errors = {...state.errors};
      delete errors[name];
      context.setState({
        ...covertToObject(name, value, isChecked),
        errors
      });
    } else {
      context.setState(covertToObject(name, value, isChecked));
    }
  }
};

export const createHandleBlur = (context) => {
  return ({target}) => {
    const { state } = context;
    const { name, value } = target;
    const { isError, message, isNormal } = isValid(name, value);
    const normal = {
      ...state.normal,
      ...(isNormal ? {[name]: true} : {[name]: false}),
    };

    if (isError) {
      let success = {...state.success};
      delete success[name];
      context.setState({
        success,
        errors: {
          ...state.errors,
          [name]: message
        },
        normal
      })
    } else if (isError === false) {
      let errors = {...state.errors};
      delete errors[name];
      context.setState({
        errors,
        success: {
          ...state.success,
          [name]: message
        },
        normal
      })
    }
  }
};
