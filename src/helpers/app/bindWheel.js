const bind = (element, fn) => {
  if (element.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      element.addEventListener("wheel", fn);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      element.addEventListener("mousewheel", fn);
    } else {
      // Firefox < 17
      element.addEventListener("MozMousePixelScroll", fn);
    }
  } else { // IE8-
    element.attachEvent("onmousewheel", fn);
  }
};

const unbind = (element, fn) => {
  if (element.removeEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      element.removeEventListener("wheel", fn);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      element.removeEventListener("mousewheel", fn);
    } else {
      // Firefox < 17
      element.removeEventListener("MozMousePixelScroll", fn);
    }
  } else { // IE8-
    element.detachEvent("onmousewheel", fn);
  }
};

export default {
  on: bind,
  off: unbind
}
