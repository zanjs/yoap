import { devicesBreakpoints } from '../../config'
import { keys } from 'helpers'

export const getDeviceBreakpoint = (width) => {
  return keys(devicesBreakpoints, (value, prop, out) => {
    // if we have selected
    // already the right breakpoint

    if (out && width <= out.value && value < out.value) {
      return {name: prop, width: value};
    } else if (!out && width <= value) {
      return {name: prop, width: value};
    }

    return out;
  });
};

export const getPrevDeviceBreakpoint = ({name, size}) => {
  return keys(devicesBreakpoints, (value, prop, out) => {
    if (size !== value && value < size) {
      return {name: prop, width: value};
    }

    return out;
  });
};
